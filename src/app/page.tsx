'use client';
import MenuBar from "../component/MenuBar.jsx";
import React from "react";
import { Spotlight } from "../ui/Spotlight";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <MenuBar />
      <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Spotlight
            className="transform -translate-x-1/2 -translate-y-1/2" // Centering trick
            fill="white"
          />
        </div>
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 flex flex-col items-center"> {/* Updated: Added flex and items-center */}
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Spotlight <br /> is the new trend.
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Spotlight effect is a great way to draw attention to a specific part
            of the page. Here, we are drawing the attention towards the text
            section of the page. I don&apos;t know why but I&apos;m running out of
            copy.
          </p>

          {/* Centered Button */}
          <Link href="/dashboard">
            <button className=" mt-8 bg-transparent hover:bg-grey-100 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              GO TO DASHBOARD
            </button>
          </Link >
        </div>
      </div>
    </>
  );
}
