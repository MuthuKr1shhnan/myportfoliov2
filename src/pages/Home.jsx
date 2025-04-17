import { motion as Motion } from "motion/react";
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import { useTypewriter, Cursor } from "react-simple-typewriter";
import NeuroBackground from "../components/NeuroBackground";
import "../index.css";
import '../my-btn-theme.css';
import { FaPhoneVolume } from "react-icons/fa6";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoLogoWhatsapp } from "react-icons/io";

const Home = () => {
  const [text] = useTypewriter({
    words: [
      "I am a Frontend Developer 😎.",
      "I like to create smooth websites 🪛.",
      "I like to design websites 🖌️.",
    ],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
    delaySpeed: 2500,
  });
  const num = import.meta.env.VITE_MyNumber;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // path to resume in public folder
    link.download = "MuthuKrishnan(Frontend Developer)";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CV Downloaded Successfully 🎉", {
      position: "top-left",
      autoClose: 3000,
      pauseOnHover: true,
    });
  };

  return (
    <section id="home">
      <div>
        <Motion.div className='flex flex-col h-[100vh ]min-h-[100vh] top-0 left-0 relative min-w-[320px] '>
          <NeuroBackground />
          <div className='bg-[#111010] w-full h-full min-h-[100svh] flex flex-col lg:flex-row justify-center gap-8 items-center'>
            <div className='w-full h-full flex flex-col justify-center items-center  lg:pl-24 xl:pl-0 absolute z-20'>
              <h1 className='text-center text-7xl md:text-8xl lg:text-8xl   text-[#fdfdfd] cursor-pointer m-10 mb-4 '>
                {"Hi! I'm Muthu Krishnan.S".split("").map((letter, index) => (
                  <span className='hoverText ubuntu-medium' id='ubuntu-medium' key={index}>
                    {letter}
                  </span>
                ))}
              </h1>
              <h1 className=''>
                <span className='text-2xl md:text-3xl lg:text-4xl font-cursive text-[#EEEEEE]'>
                  {text}
                </span>
                <span className='text-[#EEEEEE] text-2xl md:text-2xl'>
                  <Cursor />
                </span>
              </h1>
              <div className='flex flex-col md:flex-row w-full  justify-center items-center gap-10 mt-16'>
                <AwesomeButton
                  type="secondary"
                  className="aws-btn-hero"
                  size={"small"}
                  onPress={handleDownload}
                >
                  <FaArrowAltCircleDown style={{ marginRight: '16px' }} size={24} />
                  Download CV
                </AwesomeButton>
                <a target="_blank"> <AwesomeButton type="whatsapp" className="whats"  sharer={{phone: '9360443009'}} target={'_blank'} href={`https://wa.me/${num}`} size={"small"}>
                  WhatsApp <IoLogoWhatsapp  size={28} style={{ marginLeft: '16px' }} />
                </AwesomeButton></a>
               
              </div>
            </div>
          </div>
          <ToastContainer />
        </Motion.div>
      </div>
    </section>
  );
};

export default Home;
