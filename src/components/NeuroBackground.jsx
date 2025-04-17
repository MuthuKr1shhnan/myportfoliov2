import React, { useEffect, useRef } from "react";

const NeuroBackground = () => {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, tX: 0, tY: 0 });

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    let gl, uniforms;

    const initShader = () => {
      const vsSource = `
        precision mediump float;
        varying vec2 vUv;
        attribute vec2 a_position;
        void main() {
            vUv = .5 * (a_position + 1.);
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_ratio;
        uniform vec2 u_pointer_position;
        uniform float u_scroll_progress;

        vec2 rotate(vec2 uv, float th) {
            return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
        }

        float neuro_shape(vec2 uv, float t, float p) {
            vec2 sine_acc = vec2(0.);
            vec2 res = vec2(0.);
            float scale = 8.;

            for (int j = 0; j < 15; j++) {
                uv = rotate(uv, 1.);
                sine_acc = rotate(sine_acc, 1.);
                vec2 layer = uv * scale + float(j) + sine_acc - t;
                sine_acc += sin(layer);
                res += (.5 + .5 * cos(layer)) / scale;
                scale *= (1.2 - .07 * p);
            }
            return res.x + res.y;
        }

        void main() {
            vec2 uv = .5 * vUv;
            uv.x *= u_ratio;

            vec2 pointer = vUv - u_pointer_position;
            pointer.x *= u_ratio;
            float p = clamp(length(pointer), 0., 1.);
            p = .5 * pow(1. - p, 2.);

            float t = .001 * u_time;
            vec3 color = vec3(0.);

            float noise = neuro_shape(uv, t, p);

            noise = 1.2 * pow(noise, 3.);
            noise += pow(noise, 10.);
            noise = max(.0, noise - .5);
            noise *= (1. - length(vUv - .5));

           color = normalize(vec3(0.0, 0.0, 1.0));

            color = color * noise;

            gl_FragColor = vec4(color, noise);
        }
      `;

      gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");
      if (!gl) {
        alert("WebGL is not supported by your browser.");
      }

      function createShader(gl, sourceCode, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error("Shader compilation failed: " + gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      }

      const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
      const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);

      function createShaderProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
          return null;
        }
        return program;
      }

      const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);

      function getUniforms(program) {
        let uniforms = {};
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
          let uniformName = gl.getActiveUniform(program, i).name;
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
      }

      uniforms = getUniforms(shaderProgram);

      const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      gl.useProgram(shaderProgram);

      const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
      gl.enableVertexAttribArray(positionLocation);

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    };

    const render = () => {
      const currentTime = performance.now();

      pointer.current.x += (pointer.current.tX - pointer.current.x) * 0.5;
      pointer.current.y += (pointer.current.tY - pointer.current.y) * 0.5;

      gl.uniform1f(uniforms.u_time, currentTime);
      gl.uniform2f(uniforms.u_pointer_position, pointer.current.x / window.innerWidth, 1 - pointer.current.y / window.innerHeight);
      gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      canvasEl.width = window.innerWidth * devicePixelRatio;
      canvasEl.height = window.innerHeight * devicePixelRatio;
      gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
    };

    const setupEvents = () => {
      window.addEventListener("pointermove", e => {
        pointer.current.tX = e.clientX;
        pointer.current.tY = e.clientY;
      });
      window.addEventListener("touchmove", e => {
        pointer.current.tX = e.targetTouches[0].clientX;
        pointer.current.tY = e.targetTouches[0].clientY;
      });
      window.addEventListener("click", e => {
        pointer.current.tX = e.clientX;
        pointer.current.tY = e.clientY;
      });
    };

    initShader();
    resizeCanvas();
    setupEvents();
    window.addEventListener("resize", resizeCanvas);

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <><div className="w-full backdrop-blur-[10px] h-[100vh] absolute top-0 left-0 z-2 bg-[#00000040]"></div><canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1}} /></> 
};

export default NeuroBackground;
