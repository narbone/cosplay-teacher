/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineInstagram } from "react-icons/ai";
import { GiAbstract116 } from "react-icons/gi";

import ReactGA from "react-ga4";

// ---------------------------------------------------------------------------
// ANALYTICS
// ---------------------------------------------------------------------------
ReactGA.initialize("G-WSRFG37E4E");

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
interface SectionData {
  id: string;
  text: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  textPosition?: string;
  bgImageUrl?: string;
  bgImagePosition?: string;
}

interface SectionProps extends SectionData {
  index: number;
}

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------

/** Tailwind position classes for each section text card (mobile + desktop). */
const TEXT_POSITIONS: string[] = [
  "bottom-20 md:top-30 md:right-40 max-w-[280px] md:max-w-md",
  "top-10 md:top-20 md:right-100 max-w-[280px] md:max-w-md",
  "bottom-10 left-10 md:bottom-80 md:right-50 max-w-[280px] md:max-w-md",
];

/** Tailwind background-position classes for each section image. */
const BG_IMAGE_POSITIONS: string[] = [
  "bg-center", // vision  — centred
  "bg-center ", // process — top on mobile, offset right on desktop
  "bg-center md:bg-[20%_center]", // impact  — bottom on mobile, right-aligned on desktop
];

// ---------------------------------------------------------------------------
// MOCK DATA  — replace this with a real fetch() inside useSections()
// ---------------------------------------------------------------------------
const MOCK_SECTIONS: SectionData[] = [
  {
    id: "vision",
    text: "We don't follow trends. We create artifacts. Digital experiences that feel tangible, imperfect, and human.",
    bgColor: "#3D3E40",
    textColor: "#F2D8CE",
    accentColor: "#D9BEA7",
    textPosition: TEXT_POSITIONS[0],
    bgImageUrl: "images/model.jpeg",
    bgImagePosition: BG_IMAGE_POSITIONS[0],
  },
  {
    id: "process",
    text: "Hand-crafted algorithms and deliberate imperfections. We believe the best work happens in the margins.",
    bgColor: "#D9BEA7",
    textColor: "#3D3E40",
    accentColor: "#BFBDB8",
    textPosition: TEXT_POSITIONS[1],
    bgImageUrl: "images/few-sketches.jpeg",
    bgImagePosition: BG_IMAGE_POSITIONS[1],
  },
  {
    id: "impact",
    text: "Creating ripples that last. Our work isn't meant to be consumed and forgotten. It's meant to be felt.",
    bgColor: "#F2D8CE",
    textColor: "#3D3E40",
    accentColor: "#A60311",
    textPosition: TEXT_POSITIONS[2],
    bgImageUrl: "images/teacher.jpeg",
    bgImagePosition: BG_IMAGE_POSITIONS[2],
  },
];

// ---------------------------------------------------------------------------
// CUSTOM HOOK — swap mock data for a real REST call when ready
// ---------------------------------------------------------------------------

/**
 * Fetches the sections data.
 *
 * TODO: Replace the mock with a real API call, e.g.:
 *   const res = await fetch("https://your-api.com/sections");
 *   const data: SectionData[] = await res.json();
 */
function useSections() {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSections() {
      try {
        // --- REPLACE BELOW with your real fetch() call ---
        await new Promise((resolve) => setTimeout(resolve, 0)); // simulated delay
        setSections(MOCK_SECTIONS);
        // -------------------------------------------------
      } catch (err) {
        setError("Failed to load sections. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchSections();
  }, []);

  return { sections, loading, error };
}

// ---------------------------------------------------------------------------
// COMPONENTS
// ---------------------------------------------------------------------------

const Section: React.FC<SectionProps> = ({
  id,
  text,
  bgImageUrl,
  bgImagePosition,
  bgColor,
  textColor,
  accentColor,
  textPosition,
  index,
}) => {
  const textPosClass = textPosition ?? TEXT_POSITIONS[0];
  const bgPosClass = bgImagePosition ?? "bg-center";

  return (
    <section
      id={id}
      className={`relative h-screen w-full overflow-hidden font-mono ${index === 0 ? "mt-[-60px]" : ""}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Constrained inner container (1600px max) */}
      <div className="relative size-full max-w-[1600px] mx-auto overflow-hidden">
        {/* Background image + overlay */}
        {bgImageUrl && (
          <div className="absolute inset-0 size-full z-0">
            <div
              className={`size-full bg-cover lg:bg-contain ${bgPosClass} bg-no-repeat`}
              style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}${bgImageUrl})`,
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}

        {/* Text card */}
        <div className="absolute inset-0 size-full z-10 pointer-events-none">
          <motion.div
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className={`
              absolute pointer-events-auto w-[85%]
              inset-x-0 mx-auto
              md:inset-x-auto md:mx-0 md:w-fit
              ${textPosClass}
            `}
          >
            <div
              className="p-6 md:p-8 max-w-sm md:max-w-md"
              style={{
                backgroundColor: `${bgColor}cc`,
                borderColor: accentColor,
                color: textColor,
              }}
            >
              <p className="text-xl md:text-2xl text-left font-medium">
                {text}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------

const NavBar: React.FC = () => (
  // <nav className="sticky top-0 z-50 bg-[rgba(61,62,64,0.02)] backdrop-blur-sm font-mono">
  //   <div className="max-w-[1600px] mx-auto px-6 lg:px-20 py-4 flex justify-between items-center">
  //     <div className="w-40 lg:w-40 h-16 bg-transparent" />
  //   </div>
  // </nav>

  <nav className="sticky top-0 z-50 bg-[rgba(61,62,64,0.2)] backdrop-blur-sm] font-mono">
    <div className="max-w-[1600px] mx-auto px-6 lg:px-20 py-4 flex justify-between items-center">
      {/* <div className="w-24 lg:w-28">
        <img
          src="images/vv-logo.png"
          alt="logo"
          className="size-full object-contain"
        />
      </div> */}
    </div>
  </nav>
);

// ---------------------------------------------------------------------------

const Footer: React.FC = () => (
  <footer className="bg-[rgb(217_190_167)] text-[#3D3E40] py-10 px-8">
    <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-16">
      <div className="max-w-2xl">
        <h2 className="text-5xl md:text-6xl font-bold leading-[0.9] tracking-tighter mb-8">
          Cosplay drawing classes.
        </h2>

        <div className="text-lg md:text-xl opacity-80 font-medium leading-relaxed">
          Hosted by council name. Find the next available date on
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap group inline-flex items-center gap-3 ml-2 align-middle transition-all hover:opacity-100"
          >
            <span className="decoration-2">Instagram</span>
            <div className="p-2 border-2 border-[#3D3E40] rounded-lg group-hover:bg-[#3D3E40] group-hover:text-[#F2D8CE] transition-colors">
              <AiOutlineInstagram size={20} />
            </div>
          </a>
        </div>
      </div>
    </div>

    <div className="w-full md:w-auto flex justify-center pt-10">
      <div className="text-lg tracking-[0.4em] opacity-40 text-center md:text-right">
        <a
          href="https://www.narbone.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          narbone.com © 2026
        </a>
      </div>
    </div>
  </footer>
);

// ---------------------------------------------------------------------------
// APP
// ---------------------------------------------------------------------------

export default function App() {
  const { sections, loading, error } = useSections();

  return (
    <main className="size-full font-mono bg-[#3D3E40]">
      <NavBar />

      {loading && (
        <div className="flex items-center justify-center h-screen text-[#F2D8CE]">
          Loading…
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-screen text-red-400">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        sections.map((section, index) => (
          <Section key={section.id} index={index} {...section} />
        ))}

      <Footer />
    </main>
  );
}
