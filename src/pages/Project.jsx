import React from "react";
import { motion as Motion } from "framer-motion";
import { Hlt1, Hlt2 } from "../svg/Svg";
import { HiMiniArrowSmallRight } from "react-icons/hi2";

const Project = () => {
  const projects = [
    {
      title: "Apple website Clone",
      image: "./apple.png",
      tech_1: "React Js",
      tech_2: "Tailwind CSS",
      link: "https://muthukr1shhnan.github.io/apple-clone/",
    },
    {
      title: "Instagram Clone",
      image: "./insta.png",
      tech_1: "React Js",
      tech_2: "Tailwind CSS",
      link: "https://muthukr1shhnan.github.io/insta/",
    },
    {
      title: "Weather Website",
      image: "./weather.png",
      tech_1: "React Js",
      tech_2: "Tailwind CSS",
      link: "https://muthukr1shhnan.github.io/weatherapp/",
    },
    {
      title: "Portfolio V1",
      image: "./portfolio.png",
      tech_1: "React Js",
      tech_2: "Tailwind CSS",
      link: "https://muthukr1shhnan.github.io/my-portfolio/",
    },
  ];
  const getResponsiveXValue = (direction = "left") => {
    const screenWidth = window.innerWidth;

    let value = 0;

    if (screenWidth < 640) {
      value = 60; // Mobile
    } else if (screenWidth < 1024) {
      value = 140; // Tablet
    } else {
      value = 300; // Desktop
    }

    return direction === "left" ? -value : value;
  };

  return (
    <section id='projects'>
      <div
        style={{ backgroundImage: "url('/bg-pattern2.svg')" }}
        className='w-full h-[100vh] bg-[#0e0e0e] overflow-auto overflow-x-hidden md:overflow-hidden bg-cover bg-center bg-no-repeat text-white p-8 flex flex-col items-center'
      >
        <Motion.div
          className='w-[95%] grid grid-cols-1 mx-auto z-10 pb-[72px]'
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          initial='hidden'
          animate='show'
        >
          <div className='pt-16 '>
            {/* Adjust spacing here */}
            <Motion.h2
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.5 }}
              className='text-2xl md:text-3xl overflow-x-hidden font-semibold bg-gradient-to-r from-[#97d9f7] to-[#00a6f4] bg-clip-text text-transparent text-center flex justify-center items-center gap-2'
            >
              <Hlt1 />
              projects
              <Hlt2 />
            </Motion.h2>
          </div>
          {/* Project Cards */}
          <div className='w-[90%] mx-auto flex flex-wrap justify-center gap-8 md:gap-14 py-10 mt-5'>
            {(() => {
              const elements = [];
              for (let i = 0; i < projects.length; i++) {
                const item = projects[i];
                const isLeft = i % 2 === 0;

                elements.push(
                  <Motion.div
                    key={i}
                    initial={{
                      x: getResponsiveXValue(isLeft ? "left" : "right"),
                    }}
                    whileInView={{ x: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: "linear",
                      delay: i * 0.1,
                    }}
                    viewport={{ once: false, amount: 0.3 }}
                    className='flex flex-col justify-center items-center gap-1.5 project-box w-full sm:w-[45%] lg:min-w-[42%]'
                  >
                    <div className='w-[280px]  h-[200px] lg:w-[280px] lg:h-[200px] overflow-hidden rounded-[20px] bg-gray-800 flex justify-center items-center relative'>
                      <img
                        src={item.image}
                        alt={item.title}
                        loading='lazy' // Added lazy loading here
                        className='w-[280px] zoom h-[200px] lg:w-[340px] lg:h-[230px] object-cover'
                      />
                      <div className='tech-box'>
                        <div className="px-3 py-1 font-['Poppins'] text-white rounded-[20px] font-[600] text-[12px] bg-[#8600E4]">
                          {item.tech_1}
                        </div>
                        <div className="px-3 py-1 font-['Poppins'] rounded-[20px] font-[600] text-[12px] bg-sky-500">
                          {item.tech_2}
                        </div>
                      </div>
                      <div className='link-box'>
                        <a
                          href={item.link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Motion.div
                            className='w-[40px] h-[40px] rounded-[50%] flex justify-center items-center bg-green-700'
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            <HiMiniArrowSmallRight size={28} className='clr' />
                          </Motion.div>
                        </a>
                      </div>
                    </div>
                    <div className="font-['Poppins'] text-white flex flex-col justify-center items-start pl-4 project-text">
                      <h2 className='text-[12px] lg:text-[16px] font-[700] project-text-h1 zom'>
                        {item.title}
                      </h2>
                      <p className='text-[10px] font-[400]'></p>
                    </div>
                  </Motion.div>
                );
              }
              return elements;
            })()}
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Project;
