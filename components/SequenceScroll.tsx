"use client";

import { useScroll, useTransform, motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const FRAME_COUNT = 240;

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  // Opacity transforms for text overlays
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];
      let loadedCount = 0;

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          const frameStr = i.toString().padStart(3, "0");
          img.src = `/sequence/ezgif-frame-${frameStr}.jpg`;
          img.onload = () => {
            loadedImages[i - 1] = img;
            loadedCount++;
            setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load frame ${i}`);
            loadedCount++;
            setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            resolve(); // Resolve anyway to avoid blocking
          };
        });
        promises.push(promise);
      }

      // Race between loading all images and a 10s timeout
      const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 10000));
      await Promise.race([Promise.all(promises), timeoutPromise]);

      setImages(loadedImages);
      setTimeout(() => setLoaded(true), 500);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!loaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderFrame = (index: number) => {
      // Clamp index
      const frame = Math.max(1, Math.min(FRAME_COUNT, index));
      const img = images[frame - 1];

      if (img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // "Cover" fit logic
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    // Subscribe to scroll changes
    const unsubscribe = frameIndex.on("change", (latest) => {
      requestAnimationFrame(() => renderFrame(Math.round(latest)));
    });

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.round(frameIndex.get()));
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
      unsubscribe();
    };
  }, [loaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#0a0a0a]">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-white"
          >
            <div className="text-2xl font-light tracking-widest animate-pulse mb-4">LOADING TUKU...</div>
            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#c6a982]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-2 text-sm text-white/50 font-mono">{progress}%</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-10">

          {/* Section 1: Title */}
          <motion.div style={{ opacity: opacity1 }} className="text-center absolute">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-4">TUKU</h1>
            <p className="text-xl md:text-2xl tracking-[0.5em] text-gray-300 uppercase">Tetangga Tuku</p>
          </motion.div>

          {/* Section 2: Slogan Left */}
          <motion.div style={{ opacity: opacity2 }} className="absolute left-10 md:left-32 max-w-lg">
            <h2 className="text-4xl md:text-6xl font-light leading-tight text-white">
              Racikan <br /><span className="font-bold italic text-[#c6a982]">Lokal.</span>
            </h2>
          </motion.div>

          {/* Section 3: Slogan Right */}
          <motion.div style={{ opacity: opacity3 }} className="absolute right-10 md:right-32 text-right max-w-lg">
            <h2 className="text-4xl md:text-6xl font-light leading-tight text-white">
              Taste the <br /><span className="font-bold italic text-[#c6a982]">Difference.</span>
            </h2>
          </motion.div>

          {/* Section 4: CTA */}
          <motion.div style={{ opacity: opacity4 }} className="text-center absolute bottom-32 md:bottom-auto">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 text-white">Rasakan Bedanya.</h2>
            <button className="pointer-events-auto bg-[#c6a982] hover:bg-[#b0926b] text-black px-8 py-4 rounded-full text-lg font-bold tracking-wide transition-all transform hover:scale-105">
              PESAN SEKARANG
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
