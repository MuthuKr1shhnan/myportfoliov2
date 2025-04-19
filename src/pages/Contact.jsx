import React, { useState } from "react";
import { Hlt3 } from "../svg/Svg";
import { IoIosSend } from "react-icons/io";
import emailjs from "emailjs-com";
import { AwesomeButton } from "react-awesome-button";
import { motion as Motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error as user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = { email: "", message: "" };

    if (!formData.email.trim()) {
      newErrors.email = "⚠️ Email is required";
      hasErrors = true;
    }

    if (!formData.message.trim()) {
      newErrors.message = "⚠️ Message is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Show the toast with progress bar
    const toastId = toast.loading("Sending your message...", {
      progress: 0,
      autoClose: false, // We will close it manually after success
    });

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(() => {
        // Update the toast with a success message
        toast.update(toastId, {
          render: "Message sent successfully 🎉",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          icon: "✅", // You can also set a custom icon or use a tick mark
        });

        setFormData({ email: "", message: "" });
      })
      .catch(() => {
        // Update the toast with an error message
        toast.update(toastId, {
          render: "Oops! Something went wrong.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          icon: "❌", // Error icon
        });
      });
  };

  return (
    <section
      id='contact'
      className='bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: "url('/bg-contact.svg')" }}
    >
      <Motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1, once: true }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          type: "spring",
          stiffness: 300,
        }}
        viewport={{ once: true, amount: 0.8 }}
        className='w-full h-[100vh] bg-cover bg-center bg-no-repeat flex-col flex items-center justify-center px-4'
      >
        <form className='w-full max-w-xl mt-auto text-white' onSubmit={handleSubmit}>
          <h2 className='text-4xl font-bold mb-6'>Mail Me 📨</h2>

          <div className='relative mb-12 w-full flex'>
            <Hlt3 />
          </div>

          <label className='block text-gray-300 mb-2' htmlFor='email'>
            Your email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-transparent border-b ${
              errors.email ? "border-red-500" : "border-gray-600"
            } py-2 px-1 text-white focus:outline-none`}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
          )}

          <label className='block text-gray-300 mt-6 mb-2' htmlFor='message'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            rows='4'
            value={formData.message}
            onChange={handleChange}
            className={`w-full bg-transparent border-b ${
              errors.message ? "border-red-500" : "border-gray-600"
            } py-2 px-1 text-white focus:outline-none resize-none`}
          />
          {errors.message && (
            <p className='text-red-500 text-sm mt-1'>{errors.message}</p>
          )}
          <div className=' mt-6'>
            <AwesomeButton
              type='primary'
              size='large'
              onPress={(e) => handleSubmit(e)}
            >
              Send Mail <IoIosSend style={{ marginLeft: "12px" }} size={22} />
            </AwesomeButton>
          </div>
        </form>
        <Motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            stiffness: 120,
            delay: 0.3,
          }}
          viewport={{ once: true }}
          className=' flex items-center h-24 justify-end mt-auto mr-36 w-full gap-8'
        >
          <a
            href='www.linkedin.com/in/muthu-krishnan000'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 text-3xl hover:scale-110 transition-transform duration-300'
          >
            <FaLinkedin size={48} />
          </a>
          <a
            href='https://github.com/MuthuKr1shhnan'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-300 text-3xl hover:scale-110 transition-transform duration-300'
          >
            <FaGithubSquare  size={48}  />
          </a>
        </Motion.div>
      </Motion.div>
    </section>
  );
};

export default Contact;
