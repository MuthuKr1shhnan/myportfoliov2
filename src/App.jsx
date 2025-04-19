import Loader from "./components/Loader";

import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Project from "./pages/Project";
import MobileMenu from "./components/MobileMenu";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import SparkEffect from "./components/SparkEffect";
import FloatingSocials from "./components/FloatingSocials";

function App() {
  const [loader, upadateLoader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      upadateLoader(false);
    }, 100000);
  }, []);

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
       
       
      />
      
      <Loader loader={loader} />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <FloatingSocials/>
      <Home />
      <SparkEffect />
      <About />
      <Project />
      <Contact />
    </>
  );
}

export default App;
