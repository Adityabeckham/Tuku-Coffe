"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Cerita Tuku", href: "#about" },
  { title: "Belanja", href: "#shop" },
  { title: "Kontak", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0] as [number, number, number, number],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1] as [number, number, number, number],
      },
    },
    open: {
      y: 0,
      transition: {
        ease: [0, 0.55, 0.45, 1] as [number, number, number, number],
        duration: 0.7,
      },
    },
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="z-50">
        <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
          Tuku
        </Link>
      </div>

      {/* Menu Button */}
      <div className="z-50 cursor-pointer" onClick={toggleMenu}>
        <div className="text-sm font-medium tracking-widest uppercase">
          {isOpen ? "Close" : "Menu"}
        </div>
      </div>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-dvh bg-[#c6a982] origin-top text-black flex flex-col justify-center items-center"
          >
            <div className="flex flex-col h-full justify-center items-center gap-8">
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col items-center gap-4"
              >
                {navLinks.map((link, index) => (
                  <div key={index} className="overflow-hidden">
                    <motion.div
                      variants={mobileLinkVars}
                      className="text-5xl md:text-7xl font-bold uppercase tracking-tighter hover:italic transition-all cursor-pointer"
                    >
                      <Link href={link.href} onClick={toggleMenu}>
                        {link.title}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
                exit={{ opacity: 0, y: 20 }}
                className="flex gap-6 mt-10 text-xl"
              >
                <a href="#" className="hover:scale-110 transition-transform"><FaInstagram /></a>
                <a href="#" className="hover:scale-110 transition-transform"><FaTwitter /></a>
                <a href="#" className="hover:scale-110 transition-transform"><FaFacebookF /></a>
              </motion.div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
