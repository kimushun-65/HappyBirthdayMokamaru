'use client'

import Image from "next/image";
import { useState, Suspense } from "react";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
});

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 overflow-hidden gap-8">
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>

      <h1 className="text-6xl md:text-8xl font-bold text-center z-10 relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
        HAPPY BIRTHDAY MOKA
      </h1>

      <Card
        className="cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-2xl overflow-hidden z-10 relative"
        onClick={() => setIsClicked(!isClicked)}
      >
        <div className="relative w-full max-w-2xl">
          <Image
            src={isClicked ? "/S__58490909.jpg" : "/S__58490910.jpg"}
            alt="Happy Birthday"
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </Card>
    </div>
  );
}
