import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { motion as Motion } from "framer-motion";

const FloatingSocials = () => {
  return (
    <Motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
        delay: 0.3,
      }}
      className="fixed bottom-8 right-6 z-50 flex flex-col items-center gap-4  p-3 "
    >
      <a
        href="https://www.linkedin.com/in/muthu-krishnan000"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500  hover:scale-110 transition-transform duration-300"
      >
        <FaLinkedin size={40} />
      </a>
      <a
        href="https://github.com/MuthuKr1shhnan"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:scale-110 transition-transform duration-300"
      >
        <FaGithubSquare size={40} />
      </a>
    </Motion.div>
  );
};

export default FloatingSocials;
