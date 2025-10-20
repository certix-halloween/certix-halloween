import { Button } from "@/components/ui/button";
import Bgvideo from "../assets/Video/bgvideo.mp4";
import React, { useEffect, useRef } from "react";
import {
  motion,
  MotionConfig,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { Variants, TargetAndTransition } from "framer-motion";

/** ---------- Animation Tuning ---------- */
// Easing tuned for long, smooth ramps
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Entrance: slower + clearer staircase feel
const ENTER_DURATION = 1.05; // was 0.75
const STAGGER        = 0.22; // was 0.14

// Parallax springs: calmer drift
const STIFFNESS = 34;
const DAMPING   = 24;
const MASS      = 0.6;

const RANGE_H1  = { x: 4, y: 3 };
const RANGE_P   = { x: 5, y: 4 };
const RANGE_CTA = { x: 6, y: 5 };

/** ---------- Variants ---------- */
const wrap: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: STAGGER },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(1px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: ENTER_DURATION, ease: EASE },
  },
};

const HeroSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  // Mouse-parallax values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Smooth springs
  const spring = { stiffness: STIFFNESS, damping: DAMPING, mass: MASS };
  const mxSpring = useSpring(mx, spring);
  const mySpring = useSpring(my, spring);

  // Parallax ranges (subtle)
  const h1X  = useTransform(mxSpring, [-150, 150], [-RANGE_H1.x, RANGE_H1.x]);
  const h1Y  = useTransform(mySpring, [-100, 100], [-RANGE_H1.y, RANGE_H1.y]);
  const pX   = useTransform(mxSpring, [-150, 150], [-RANGE_P.x,  RANGE_P.x]);
  const pY   = useTransform(mySpring, [-100, 100], [-RANGE_P.y,  RANGE_P.y]);
  const ctaX = useTransform(mxSpring, [-150, 150], [-RANGE_CTA.x, RANGE_CTA.x]);
  const ctaY = useTransform(mySpring, [-100, 100], [-RANGE_CTA.y, RANGE_CTA.y]);

  // rAF-throttled mouse handler (keeps motion silky)
  const rafRef = useRef<number | null>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced) return;
    const { currentTarget, clientX, clientY } = e;
    const rect = (currentTarget as HTMLElement).getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      mx.set(x);
      my.set(y);
    });
  };
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  // Ambient pill glow (slower loop)
  const flickerAnimate: TargetAndTransition | undefined = prefersReduced
    ? undefined
    : {
        opacity: [1, 0.985, 1],
        boxShadow: [
          "0 0 0px rgba(65,208,133,0.00)",
          "0 0 16px rgba(65,208,133,0.22)",
          "0 0 0px rgba(65,208,133,0.00)",
        ],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <MotionConfig transition={{ duration: ENTER_DURATION, ease: EASE }}>
      {/* helper for fog drift */}
      <style>{`
        @keyframes fogDrift {
          0%   { transform: translate3d(-10%, 0, 0) scale(1.05); opacity: .06; }
          50%  { transform: translate3d(10%, 0, 0)  scale(1.06); opacity: .10; }
          100% { transform: translate3d(-10%, 0, 0) scale(1.05); opacity: .06; }
        }
      `}</style>

      <section
        className="relative w-full mx-auto min-h-[100vh] flex items-center justify-center overflow-hidden"
        onMouseMove={onMouseMove}
        aria-label="Halloween hero"
      >
        {/* 🎃 Background Video (slow fade) */}
        <motion.video
          className="absolute inset-0 w-full h-full object-cover brightness-[.85] contrast-105 transform-gpu will-change-transform"
          src={Bgvideo}
          autoPlay
          loop
          muted
          playsInline
          initial={prefersReduced ? {} : { opacity: 0, scale: 1.01 }}
          animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        />

        {/* Base dark overlay */}
        <motion.div
          className="absolute inset-0 bg-black/55 will-change-opacity"
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 0.9, ease: EASE }}
        />

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 38%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Tint */}
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply bg-[#0b2e22]/5" />

        {/* Fog layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 60%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.0) 60%)",
            animation: "fogDrift 22s ease-in-out infinite",
            willChange: "transform, opacity",
          }}
        />

        {/* 💀 Content */}
        <motion.div
          className="container mx-auto px-4 py-20 relative z-10"
          variants={wrap}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* 1) Intake pill */}
            <motion.div
              className="inline-block px-6 py-2 bg-primary/20 border border-primary/50 rounded-full text-[#34ED8D] text-sm font-medium mb-4 will-change-transform"
              variants={fadeUp}
              // extra tiny delay so it precedes H1 but still feels staged
              transition={{ duration: ENTER_DURATION, ease: EASE, delay: STAGGER * 0.5 }}
              animate={flickerAnimate}
            >
              👻 Next Intake Starts on January 10, 2026 🎃
            </motion.div>

            {/* 2) Headline */}
            <motion.h1
              className="text-[96px] md:text-7xl font-bold leading-tight transform-gpu will-change-transform"
              style={prefersReduced ? undefined : { x: h1X, y: h1Y }}
              variants={fadeUp}
              transition={{ duration: ENTER_DURATION, ease: EASE, delay: STAGGER * 1.0 }}
            >
              <span className="text-white">Work </span>
              <span className="text-[#41D085] border-green-100">Smart</span>
              <span className="text-white">, </span>
              <span className="text-[#DFF0DA] border-green-100">Earn</span>
              <span className="text-white"> Big, </span>
              <span className="text-[#41D085]">Learn</span>
              <span className="text-white"> Fast</span>
            </motion.h1>

            {/* 3) Paragraph */}
            <motion.p
              className="text-xl text-[#EFFFEA] max-w-2xl mx-auto transform-gpu will-change-transform"
              style={prefersReduced ? undefined : { x: pX, y: pY }}
              variants={fadeUp}
              transition={{ duration: ENTER_DURATION, ease: EASE, delay: STAGGER * 2.0 }}
            >
              Experience a rewarding academic journey, personal growth, and a lively
              social and sports community in this spooky season! 🎃
            </motion.p>

            {/* 4) CTA block */}
            <motion.div
              className="pt-6 transform-gpu will-change-transform"
              style={prefersReduced ? undefined : { x: ctaX, y: ctaY }}
              variants={fadeUp}
              transition={{ duration: ENTER_DURATION, ease: EASE, delay: STAGGER * 3.0 }}
            >
              <motion.div
                // Smoother button interactions
                whileHover={prefersReduced ? {} : { scale: 1.02, y: -2 }}
                whileTap={prefersReduced ? {} : { scale: 0.99, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative inline-block"
              >

                <div className="flex gap-6 justify-center">
   <Button
                  size="lg"
                  className="relative z-10 text-lg px-8 py-6 transition-all duration-500 border-2 
                             border-transparent text-white 
                             bg-gradient-to-r from-[#37B171] via-[#216A44] to-[#41D085]
                             hover:shadow-[0_0_22px_rgba(65,208,133,0.40)]"
                >
                  👻 Apply Now 
                </Button>

                   <Button
                  size="lg"
                  className="relative z-10 text-lg px-8 py-6 transition-all duration-500 border-2 
                             border-transparent text-white 
                             bg-gradient-to-r from-[#37B171] via-[#216A44] to-[#41D085]
                             hover:shadow-[0_0_22px_rgba(65,208,133,0.40)]"
                >
                  👻 Apply Now
                </Button>
                </div>
             

                {/* Slower sheen for extra smoothness */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-md overflow-hidden"
                  style={{ WebkitMaskImage: "radial-gradient(white, transparent 70%)" }}
                >
                  <motion.span
                    initial={{ x: "-60%" }}
                    whileHover={{ x: "120%" }}
                    transition={{ duration: 1.4, ease: EASE }}
                    className="absolute left-0 top-0 h-full w-[60%] bg-white/10 skew-x-[-18deg]"
                  />
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* 🩸 Bottom fade decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>
    </MotionConfig>
  );
};

export default HeroSection;
