// import { useEffect, useState } from "react";
// import { useMediaQuery } from "react-responsive";
// import { useLocation, Link } from "react-router-dom";
// import { motion as Motion, AnimatePresence } from "framer-motion"; // <- make sure you're using framer-motion, not "motion/react"

// const NavLink = ({ to, isActive, children, onClick }) => (
//   <li>
//     <Link
//       to={to}
//       onClick={onClick}
//       className={`hover:text-blue-500 transition-colors duration-300 ${
//         isActive ? "text-blue-600 font-semibold" : "text-gray-800"
//       }`}
//     >
//       {children}
//     </Link>
//   </li>
// );

// const Navbar = ({ loader }) => {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
 
//   const isMediumOrSmaller = useMediaQuery({ maxWidth: 1023 });

//   const pathname = useLocation().pathname;

 

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const closeMenu = () => setMenuOpen(false);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         closeMenu();
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//   }, [menuOpen]);
//  console.log(loader)
//   return (
//     <>
//       <Motion.nav
//         initial={{
//           width: isMediumOrSmaller ? "80%" : "75%",
//           backgroundColor: "rgba(255, 255, 255, 0.2)",
//           borderRadius: "999px",
//           border: "1px solid rgba(255, 255, 255, 1)",
//           top: "24px",
//         }}
//         animate={{
//           width: scrolled ? "100%" : isMediumOrSmaller ? "90%" : "80%",
//           backgroundColor: scrolled
//             ? "transparent"
//             : "rgba(255, 255, 255, 0.2)",
//           border: scrolled
//             ? "0px solid transparent"
//             : "1px solid rgba(255, 255, 255, 1)",
//           borderBottom: scrolled ? "2px solid rgba(255, 255, 255, 1)" : "none",
//           borderRadius: scrolled ? "0px" : "999px",
//           top: scrolled ? "0px" : "24px",
//         }}
//         transition={{ duration: 0.4, ease: "easeInOut" }}
//         className={
//           loader
//             ? "hidden"
//             : "fixed left-1/2 transform -translate-x-1/2 px-10 md:py-6 py-4 flex items-center justify-between shadow-lg backdrop-blur-md transition-all duration-400 ease-in-out z-50 w-full"
//         }
//       >
//         {/* Logo */}

//         {/* Hamburger */}

//         {/* Desktop nav links */}
//         <ul className='hidden lg:flex flex-nowrap gap-6 text-lg font-medium text-gray-800 md:gap-4'>
//           <Link to='/' isActive={pathname === "/"}>
//             Home
//           </Link>
//           <Link to='/about_us' isActive={pathname === "/about_us"}>
//             About us
//           </Link>
//           <Link to='/portfolio' isActive={pathname === "/portfolio"}>
//             Portfolio
//           </Link>
//           <Link to='/blog' isActive={pathname === "/blog"}>
//             Blog
//           </Link>
//           <Link to='/contact_us' isActive={pathname === "/contact_us"}>
//             Contact us
//           </Link>
//         </ul>
//       </Motion.nav>

//       {/* Overlay */}
//       {menuOpen && (
//         <div
//           className='fixed inset-0 bg-black opacity-20 z-40'
//           onClick={closeMenu}
//         />
//       )}

//       {/* Mobile sidebar */}
//       <AnimatePresence>
//         {menuOpen && (
//           <Motion.div
//             id='sidebar'
//             initial={{ x: "100%" }}
//             animate={{ x: "0%" }}
//             exit={{ x: "100%" }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className='fixed top-0 right-0 w-[60%] h-full bg-white shadow-md p-6 flex flex-col space-y-8 lg:hidden z-50'
//           >
//             <button onClick={closeMenu} className='self-end mb-4'>
//               <X size={32} />
//             </button>
//             <ul className='space-y-8 text-lg'>
//               <Link to='/' onClick={closeMenu} isActive={pathname === "/"}>
//                 Home
//               </Link>
//               <Link
//                 to='/about_us'
//                 onClick={closeMenu}
//                 isActive={pathname === "/about_us"}
//               >
//                 About us
//               </Link>
//               <Link
//                 to='/portfolio'
//                 onClick={closeMenu}
//                 isActive={pathname === "/portfolio"}
//               >
//                 Portfolio
//               </Link>
//               <Link
//                 to='/blog'
//                 onClick={closeMenu}
//                 isActive={pathname === "/blog"}
//               >
//                 Blog
//               </Link>
//               <Link
//                 to='/contact_us'
//                 onClick={closeMenu}
//                 isActive={pathname === "/contact_us"}
//               >
//                 Contact us
//               </Link>
//             </ul>
//           </Motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;
// 


import React, { useEffect, useState } from "react";
import { motion as Motion, useAnimation } from "framer-motion";
import { MyLogo } from "../svg/Svg";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false); // This state will track if the user has scrolled past the hero section
  const controls = useAnimation();

  useEffect(() => {
    // Observer to detect when the user has scrolled past the hero section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the hero section is no longer visible, update the scrolled state
          if (entry.target.id === "home") {
            if (!entry.isIntersecting) {
              setScrolled(true); // User has scrolled past the hero section
            } else {
              setScrolled(false); // User is still in the hero section
            }
          }
        });
      },
      { threshold: 0.3 } // Adjust threshold based on when you want to trigger the change
    );

    // Observe the hero section
    const heroSection = document.getElementById("home");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.disconnect(); // Cleanup observer
      }
    };
  }, []);

  // Section observer to highlight active section in the navbar
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            console.log(`Active section: ${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -40% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [menuOpen]);

  return (
    <Motion.nav
      animate={controls}
      initial={{ opacity: 1, y: -10 }}
      whileInView={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.3 }}
      className={`fixed z-100 backdrop-blur-[15px] left-1/2 transform -translate-x-1/2 ${
        scrolled ? "top-0 left-0 w-full rounded-none" : "top-4 w-[85%] rounded-full"
      } px-6 py-3 bg-[rgba(10,10,10,0.43)] border border-white/10 shadow-lg transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="p-2 rounded-full">
          <a href="#home" className="font-mono text-4xl font-bold text-white">
            <MyLogo />
          </a>
        </div>
        <div
          className={`w-7 h-5 relative cursor-pointer md:hidden mb-3 text-white text-2xl ${
            menuOpen ? "opacity-0" : "opacity-100"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {["home", "about", "projects", "contact"].map((id, idx) => (
            <a
              key={idx}
              href={`#${id}`}
              className={`transition-colors ${
                activeSection === id ? "text-white font-bold" : "text-gray-400"
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </Motion.nav>
  );
};

export default Navbar;



