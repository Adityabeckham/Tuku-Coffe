# Tuku Coffee - Landing Page ☕
[PREVIEW] <img width="2668" height="1534" alt="Tuku-Coffe" src="https://github.com/user-attachments/assets/8d7eca36-0d95-4344-bf81-956858fd0668" />


A high-performance, immersive scrollytelling landing page for **Tuku Coffee**, designed to tell the story of "Tetangga Tuku" through interactive visuals. Built with the latest web technologies including **Next.js 15**, **Tailwind CSS**, and **HTML5 Canvas**.

[Link Preview] (https://tuku-coffe.vercel.app/)

## ✨ Features

- **🎥 Immersive Scrollytelling:** A seamless 240-frame image sequence rendered on HTML5 Canvas for 60fps performance, synchronized with scroll position.
- **⚡ Smooth Experience:** Integrated **Lenis** for buttery smooth inertia scrolling and **Motion** (Framer Motion) for complex entrance animations.
- **📱 Fully Responsive:** "Cover-fit" canvas logic ensures the visual experience adapts perfectly from mobile phones to 4K desktops.
- **🎨 Modern UI/UX:**
  - **Fullscreen Reveal Menu:** Elegant navigation with staggered animations.
  - **Bento Grid Layout:** Modern product showcase.
  - **Scroll-Triggered Reveals:** Text and elements fade in dynamically as you scroll.
  - **Interactive Stats:** Animated counters using `react-countup`.
- **🇮🇩 Localized Content:** Engaging copy blending Indonesian and English ("Anak Jaksel" style) to match Tuku's brand voice.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Motion](https://motion.dev/) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [React Lenis](https://github.com/darkroomengineering/lenis)
- **Components:** [Swiper](https://swiperjs.com/) (Carousel), [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/Adityabeckham/Tuku-Coffe.git
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
├── app/
│   ├── layout.tsx       # Root layout with smooth scroll provider
│   ├── page.tsx         # Main entry point combining all sections
│   └── globals.css      # Global styles & Tailwind directives
├── components/
│   ├── SequenceScroll.tsx   # Core Engine: Handles Canvas & Image Sequence
│   ├── LandingSections.tsx  # Content: About, Bento, Stats, Testimonials, CTA
│   ├── Navbar.tsx           # Fullscreen animated navigation
│   └── SmoothScroll.tsx     # Lenis wrapper component
├── public/
│   └── sequence/        # 240 extracted frames for the scroll animation
└── lib/                 # Utility functions
```

## 🔧 Optimization Details

- **Canvas Rendering:** Instead of using thousands of DOM elements, we draw images directly to an HTML5 Canvas. This drastically reduces memory usage and layout thrashing during scroll.
- **Image Preloading:** A custom preloader ensures critical frames are ready before the experience starts.
- **Dynamic Viewport Height:** Uses `dvh` units for the mobile menu to handle mobile browser address bars gracefully.

---

*This project is a fan-made portfolio piece demonstrating advanced frontend techniques.*
