import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const Loader = ({ loader }) => {
  const [show, setShow] = useState(false);

  // Run the timeout once when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 3900);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);
  

  // Handle body overflow depending on `show` state
  useEffect(() => {
    console.log("show state changed:", show);
    document.body.style.overflow = show ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto"; // reset when component unmounts
    };
  }, [show]);
  useEffect(() => {
    if (show) {
      document.body.classList.remove("loading");
    } else {
      document.body.classList.add("loading");
    }
  }, [show]);
  return (
    <Motion.div
      initial={{ y: 0 }}
      animate={{ y: "-200vh" }}
      transition={{ duration: 1, delay: 4.3 }}
      className={`${
        loader
          ? "fixed cursor-not-allowed pointer-events-none  flex justify-center items-center top-0 left-0 w-full h-full z-150 bg-[#000000] loader "
          : "hidden cursor-not-allowed pointer-events-none "
      }`}
    >
      <Motion.div>
        <DotLottieReact
          src='https://lottie.host/7a4310eb-bf8d-4d47-b89a-76b4953bbfd5/VROGabhVWU.lottie'
          loop
          autoplay
        />
      </Motion.div>
    </Motion.div>
  );
};

export default Loader;
