import React from "react";
import { Container } from "@/components/Container";

export const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-5xl gap-6 mx-auto text-white bg-brand px-7 py-10 lg:px-12 lg:py-14 lg:flex-nowrap rounded-2xl shadow-lg">
        
        {/* Left Content */}
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-semibold lg:text-3xl">
            Simplify Compliance. Empower Your Team.
          </h2>
          <p className="mt-3 text-white/90 text-lg lg:text-xl">
            Start your digital onboarding with EasyComply today and stay audit-ready, always.
          </p>
        </div>

        {/* Right CTA */}
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <a
            href="#get-started"
            className="inline-block py-3 px-8 text-lg font-medium text-white bg-accent-green rounded-md shadow hover:opacity-90 transition lg:px-10 lg:py-4"
          >
            Get Started
          </a>
        </div>
      </div>
    </Container>
  );
};
