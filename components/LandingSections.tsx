"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// --- Text Reveal Component ---
const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="relative">
            <span className="absolute opacity-20">{children}</span>
            <motion.span style={{ opacity }} className="text-white">
                {children}
            </motion.span>
        </span>
    );
};

const TextReveal = ({ text }: { text: string }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"],
    });

    const words = text.split(" ");

    return (
        <p ref={container} className="flex flex-wrap gap-2 text-3xl md:text-5xl font-light leading-tight text-white/20">
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </p>
    );
};

// --- About Section ---
export function AboutSection() {
    return (
        <section id="about" className="relative z-10 bg-[#0a0a0a] py-32 px-6 md:px-20 min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto">
                <TextReveal text="Tuku isn't just coffee, ini adalah ritual. A moment of silence di tengah chaos ibukota. We source biji kopi terbaik dari pelosok negeri, roasting with passion yang borders on obsession. Setiap cangkir tells a story of heritage, cinta, dan cita rasa nusantara." />
            </div>
        </section>
    );
}

// --- Bento Grid Section ---
export function BentoSection() {
    return (
        <section id="shop" className="relative z-10 bg-[#0a0a0a] py-20 px-6 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[800px]">

                {/* Large Item */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-[#1a1a1a]"
                >
                    <div className="absolute inset-0 bg-[url('/sequence/ezgif-frame-050.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12">
                        <h3 className="text-4xl font-bold text-white mb-2">Signature Roast</h3>
                        <p className="text-gray-300">Blend andalan, favorit tetangga.</p>
                    </div>
                </motion.div>

                {/* Small Item 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="relative group overflow-hidden rounded-3xl bg-[#1a1a1a] min-h-[300px]"
                >
                    <div className="absolute inset-0 bg-[url('/sequence/ezgif-frame-100.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60" />
                    <div className="absolute bottom-0 left-0 p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Equipment</h3>
                        <p className="text-gray-300">Seduh sendiri, like a pro.</p>
                    </div>
                </motion.div>

                {/* Small Item 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group overflow-hidden rounded-3xl bg-[#1a1a1a] min-h-[300px]"
                >
                    <div className="absolute inset-0 bg-[#c6a982] transition-colors duration-500 group-hover:bg-[#b0926b] flex flex-col justify-center items-center p-8 text-center" >
                        <h3 className="text-4xl font-bold text-black mb-4">Langganan</h3>
                        <p className="text-black/80">Fresh beans, langsung ke rumahmu.</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

// --- Stats Section ---
export function StatsSection() {
    return (
        <section className="relative z-10 bg-[#0a0a0a] py-32 px-6 md:px-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

                <div>
                    <h3 className="text-5xl md:text-7xl font-bold text-[#c6a982] mb-2">
                        <CountUp end={150} enableScrollSpy scrollSpyOnce />+
                    </h3>
                    <p className="text-white/60 uppercase tracking-widest text-sm md:text-base">Mitra Petani</p>
                </div>

                <div>
                    <h3 className="text-5xl md:text-7xl font-bold text-[#c6a982] mb-2">
                        <CountUp end={12} enableScrollSpy scrollSpyOnce />k
                    </h3>
                    <p className="text-white/60 uppercase tracking-widest text-sm md:text-base">Gelas Terjual / Hari</p>
                </div>

                <div>
                    <h3 className="text-5xl md:text-7xl font-bold text-[#c6a982] mb-2">
                        <CountUp end={98} enableScrollSpy scrollSpyOnce />
                    </h3>
                    <p className="text-white/60 uppercase tracking-widest text-sm md:text-base">Cupping Score</p>
                </div>

            </div>
        </section>
    );
}

// --- Testimonial Section ---
export function TestimonialSection() {
    return (
        <section className="relative z-10 bg-[#0a0a0a] h-screen flex items-center">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                className="w-full h-full"
            >
                <SwiperSlide className="bg-[#111] flex items-center justify-center p-10 md:p-32">
                    <div className="text-center max-w-4xl">
                        <h3 className="text-3xl md:text-6xl font-light italic text-white leading-tight mb-8">
                            &quot;Experience ngopi paling solid. Tuku beneran redefines daily coffee.&quot;
                        </h3>
                        <p className="text-[#c6a982] uppercase tracking-widest font-bold">— Coffee Connoisseur</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="bg-[#151515] flex items-center justify-center p-10 md:p-32">
                    <div className="text-center max-w-4xl">
                        <h3 className="text-3xl md:text-6xl font-light italic text-white leading-tight mb-8">
                            &quot;Masterpiece di setiap tegukan. Detail-nya nggak main-main.&quot;
                        </h3>
                        <p className="text-[#c6a982] uppercase tracking-widest font-bold">— Food & Wine Magazine</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
}

// --- CTA Section ---
export function CTASection() {
    return (
        <section className="relative z-10 bg-[#c6a982] py-32 overflow-hidden flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 px-6"
            >
                <h2 className="text-5xl md:text-8xl font-bold text-black mb-8 tracking-tighter">
                    SIAP NGOPI?
                </h2>
                <button className="bg-black text-[#c6a982] px-12 py-5 rounded-full text-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-105">
                    MULAI SEKARANG
                </button>
            </motion.div>

            {/* Animated Background Elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -left-1/4 w-[100vw] h-[100vw] border-[2px] border-black/10 rounded-full"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 -right-1/4 w-[80vw] h-[80vw] border-[2px] border-black/10 rounded-full"
            />
        </section>
    );
}

// --- Footer ---
export function Footer() {
    return (
        <footer className="relative z-10 bg-[#050505] text-white py-20 px-6 md:px-20 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">TUKU</h2>
                    <div className="flex flex-col gap-2 text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-gray-500 text-sm">© 2026 Tuku Coffee. All rights reserved.</p>
                    <p className="text-gray-600 text-xs mt-2">Dibuat oleh Beckham</p>
                </div>
            </div>
        </footer>
    );
}
