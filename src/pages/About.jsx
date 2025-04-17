import React from "react";
import { motion as Motion } from "framer-motion";
import { Hlt1, Hlt2 } from "../svg/Svg";

const About = () => {
  const getResponsiveXValue = (direction = "left") => {
    const screenWidth = window.innerWidth;

    let value = 0;

    if (screenWidth < 640) {
      // Mobile
      value = 60;
    } else if (screenWidth < 1024) {
      // Tablet
      value = 100;
    } else {
      // Desktop
      value = 300;
    }

    return direction === "left" ? -value : value;
  };
  return (
    <section id='about' className='bg-[#0e0e0e] text-white'>
      <div
        className='w-full bg-cover overflow-x-hidden h-[100vh] bg-center overflow-auto bg-no-repeat px-6 py-12 md:py-20'
        style={{ backgroundImage: "url('/bg-pattern1.svg')" }}
      >
        {/* Heading */}
        <Motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className='text-2xl md:text-3xl md:mt-16  font-semibold bg-gradient-to-r from-[#97d9f7] to-[#00a6f4] bg-clip-text text-transparent text-center flex items-center justify-center gap-2 mb-12'
        >
          <Hlt1 />
          About Me 
          <Hlt2 />
        </Motion.h2>

        {/* Content */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between max-w-6xl mx-auto gap-12'>
          {/* Left Side */}
          <Motion.div
            initial={{ opacity: 0, x:getResponsiveXValue() }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className='flex-1'
          >
            <h3 className='text-2xl md:text-3xl font-semibold mb-4'>
              Hi there 🪄
            </h3>
            <p className='text-gray-300 mb-4 text-base md:text-lg'>
  👋 Hi, I’m Muthu Krishnan! I completed my B.Com degree in 2020 🎓. Back then, I didn’t have the right tools to pursue a career in the IT field 💻. But now, with the proper setup and strong motivation, I’m fully committed to landing a job in tech 🚀.
  <br /><br />
  You can explore my <span className='text-blue-400 underline'>projects</span> and <span className='text-blue-400 underline'>skills</span> showcased on this website 🛠️. If you think I’m a good fit, I’d be excited to join your team and contribute with everything I’ve got 💪😊.
</p>

<p className='text-gray-300 text-base md:text-lg'>
  In my free time, I enjoy learning new tech, designing UI/UX 🎨, and building smooth front-end experiences ⚙️. I’m always open to new opportunities, so feel free to reach out! 📬
</p>

          </Motion.div>

          {/* Right Side */}
          <Motion.div
            initial={{ opacity: 0, x:-getResponsiveXValue()  }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className='flex-1 md:mt-16'
          >
            <h3 className='text-2xl md:text-3xl font-semibold mb-4'>
              My Skills ✨
            </h3>

            {/* Frontend Development */}
            <div className='mb-6'>
              <h4 className='text-xl text-gray-200 mb-2'>
                Frontend Development
              </h4>
              <div className='flex flex-wrap gap-3'>
                {[
                  "React.js",
                  "Javascript",
                  "Html",
                  "Css",
                  "Tailwind Css",
                  "Framer Motion",
                  "GSAP",
                ].map((skill, index) => (
                  <span
                    key={index}
                    className='bg-[#1f1f1f] text-blue-400 px-3 py-1 rounded-md text-sm md:text-base'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* UI/UX Designing */}
            <div>
              <h4 className='text-xl text-gray-200 mb-2'>UI/UX Designing</h4>
              <div className='flex flex-wrap gap-3'>
                {[
                  "Figma",
                  "Prototyping",
                  "Wireframing",
                  "Photoshop",
                  "Illustrator",
                ].map((skill, index) => (
                  <span
                    key={index}
                    className='bg-[#1f1f1f] text-blue-400 px-3 py-1 rounded-md text-sm md:text-base'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
