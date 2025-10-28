'use client'

import Image from "next/image";
import { useState, Suspense, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
});

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const images = [
    "/S__58490910.jpg",
    "/S__58490909.jpg",
    "/IMG_5913.jpeg"
  ];

  const leftCircles = useMemo(() => {
    const seed = 12345; // Fixed seed for consistency
    const random = (index: number, offset: number) => {
      const x = Math.sin(seed + index * 10 + offset) * 10000;
      return x - Math.floor(x);
    };

    return [...Array(8)].map((_, i) => ({
      width: random(i, 0) * 60 + 40,
      height: random(i, 1) * 60 + 40,
      left: random(i, 2) * 80,
      top: random(i, 3) * 100,
      color: ['#ff6b9d', '#6c5ce7', '#fdcb6e', '#fd79a8', '#a29bfe'][i % 5],
      delay: i * 0.3,
      duration: 3 + random(i, 4) * 2,
    }));
  }, []);

  const rightCircles = useMemo(() => {
    const seed = 54321; // Different seed for right side
    const random = (index: number, offset: number) => {
      const x = Math.sin(seed + index * 10 + offset) * 10000;
      return x - Math.floor(x);
    };

    return [...Array(8)].map((_, i) => ({
      width: random(i, 0) * 60 + 40,
      height: random(i, 1) * 60 + 40,
      right: random(i, 2) * 80,
      top: random(i, 3) * 100,
      color: ['#ff9ff3', '#54a0ff', '#48dbfb', '#ff6348', '#ffa502'][i % 5],
      delay: i * 0.4,
      duration: 3 + random(i, 4) * 2,
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Left side or right side
      const isLeft = Math.random() > 0.5;
      const newSparkle = {
        id: Math.random(),
        x: isLeft ? Math.random() * 20 : 80 + Math.random() * 20, // 0-20% or 80-100%
        y: Math.random() * 100,
      };
      setSparkles((prev) => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 2000);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden animate-[gradient_8s_ease_infinite]">
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>

      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-ping z-0"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            boxShadow: '0 0 20px #fbbf24, 0 0 40px #f59e0b',
          }}
        />
      ))}

      {/* Left side decorations */}
      <div className="absolute left-0 top-0 h-full w-1/4 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] text-8xl animate-spin-slow">🎉</div>
        <div className="absolute top-[25%] left-[15%] text-6xl animate-bounce" style={{ animationDuration: '2s' }}>🎈</div>
        <div className="absolute top-[40%] left-[5%] text-7xl animate-pulse" style={{ animationDuration: '1.5s' }}>✨</div>
        <div className="absolute top-[55%] left-[18%] text-9xl animate-bounce" style={{ animationDuration: '3s' }}>🎂</div>
        <div className="absolute top-[70%] left-[8%] text-6xl animate-spin-slow">🎊</div>
        <div className="absolute top-[85%] left-[12%] text-7xl animate-pulse" style={{ animationDuration: '2s' }}>🌟</div>

        {/* Floating circles left */}
        {leftCircles.map((circle, i) => (
          <div
            key={`left-circle-${i}`}
            className="absolute rounded-full animate-float"
            style={{
              width: `${circle.width}px`,
              height: `${circle.height}px`,
              left: `${circle.left}%`,
              top: `${circle.top}%`,
              background: `radial-gradient(circle, ${circle.color}, transparent)`,
              opacity: 0.6,
              animationDelay: `${circle.delay}s`,
              animationDuration: `${circle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Right side decorations */}
      <div className="absolute right-0 top-0 h-full w-1/4 pointer-events-none z-0">
        <div className="absolute top-[15%] right-[12%] text-8xl animate-spin-slow">🎁</div>
        <div className="absolute top-[30%] right-[8%] text-7xl animate-bounce" style={{ animationDuration: '2.5s' }}>🎈</div>
        <div className="absolute top-[45%] right-[15%] text-6xl animate-pulse" style={{ animationDuration: '1.8s' }}>💝</div>
        <div className="absolute top-[60%] right-[10%] text-8xl animate-bounce" style={{ animationDuration: '3.5s' }}>🍰</div>
        <div className="absolute top-[75%] right-[18%] text-7xl animate-spin-slow">🎪</div>
        <div className="absolute top-[90%] right-[6%] text-9xl animate-pulse" style={{ animationDuration: '2.2s' }}>⭐</div>

        {/* Floating circles right */}
        {rightCircles.map((circle, i) => (
          <div
            key={`right-circle-${i}`}
            className="absolute rounded-full animate-float"
            style={{
              width: `${circle.width}px`,
              height: `${circle.height}px`,
              right: `${circle.right}%`,
              top: `${circle.top}%`,
              background: `radial-gradient(circle, ${circle.color}, transparent)`,
              opacity: 0.6,
              animationDelay: `${circle.delay}s`,
              animationDuration: `${circle.duration}s`,
            }}
          />
        ))}
      </div>

      <div
        className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={images[currentImageIndex]}
            alt="Happy Birthday"
            fill
            className="object-contain"
            priority
          />
          {currentImageIndex > 0 && (
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-purple-500/20 animate-pulse pointer-events-none" />
          )}
        </div>
      </div>

      {/* Text overlay at bottom 1/3 */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 flex flex-col items-center justify-center z-20 pointer-events-none">
        <h1 className="text-5xl md:text-8xl font-black text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse drop-shadow-2xl [text-shadow:_0_0_30px_rgb(219_39_119_/_50%)]">
          HAPPY BIRTHDAY
        </h1>
        <h2 className="text-6xl md:text-9xl font-black text-center mt-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-bounce drop-shadow-2xl [text-shadow:_0_0_40px_rgb(236_72_153_/_60%)]">
          MOKA
        </h2>

        <div className="flex justify-center gap-4 mt-6">
          {['🎉', '🎂', '🎈', '✨', '🎊'].map((emoji, i) => (
            <span
              key={i}
              className="text-5xl animate-bounce"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s',
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
