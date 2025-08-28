"use client";
import { useState } from "react";
import { Container } from "@/components/Container";

interface VideoProps {
  videoSrc: string;
}

export function Video({ videoSrc }: Readonly<VideoProps>) {
  const [playVideo, setPlayVideo] = useState(false);

  if (!videoSrc) return null;

  return (
    <Container>
      <div id="product"
        className="relative h-[500px] max-w-4xl mx-auto overflow-hidden lg:mb-20 rounded-2xl cursor-pointer"
      >
        {/* Background Image Layer */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            playVideo ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: "url('/img/video.jpg')" }}
        />

        {/* Play Button */}
        {!playVideo && (
          <button
            onClick={() => setPlayVideo(true)}
            className="absolute inset-auto w-16 h-16 text-white transform -translate-x-1/2 -translate-y-1/2 lg:w-28 lg:h-28 top-1/2 left-1/2 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 lg:w-28 lg:h-28"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Play Video</span>
          </button>
        )}

        {/* Video Layer */}
     {playVideo && (
  <div className="relative  w-full max-w-4xl mx-auto aspect-video">
    <video
      src={videoSrc}
      className="w-full h-full object-contain rounded-lg"
      controls
      playsInline
      
    />
  </div>
)}
      </div>
    </Container>
  );
}
