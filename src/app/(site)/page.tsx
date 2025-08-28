import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import type { Metadata } from "next";
import { Cta } from "@/components/Cta";

import { benefitOne, benefitTwo } from "@/components/data";
export const metadata: Metadata = {
  title: "EasyComply – Simplify Compliance & Onboarding",
  description:
    "EasyComply helps SMEs and EHS teams with digital onboarding, automated compliance tracking, and smart workflows without paperwork overload.",
  keywords: [
    "compliance software",
    "SME onboarding",
    "EHS compliance",
    "workflow automation",
    "safety management",
  ],
  openGraph: {
    title: "EasyComply – Compliance Made Simple",
    description:
      "See how EasyComply digitizes compliance, onboarding, and safety workflows for SMEs and EHS teams.",
    url: "https://yourdomain.com", // replace with your domain
    siteName: "EasyComply",
    images: [
      {
        url: "https://yourdomain.com/og-home.png", // upload OG preview
        width: 1200,
        height: 630,
        alt: "EasyComply Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyComply – Compliance Made Simple",
    description:
      "Automated compliance tracking, streamlined onboarding, and effortless collaboration.",
    images: ["https://yourdomain.com/og-home.png"],
  },
};
export default function Home() {
  return (
    <Container>
      {/* Hero section */}
      <Hero />

      {/* Benefits intro */}
      <SectionTitle
        preTitle="EasyComply Advantages"
        title="Why choose EasyComply for your compliance needs?"
      >
        EasyComply is built for SMEs and EHS teams who want a seamless way to 
        manage compliance checklists, audits, and safety processes. 
        We simplify digital onboarding, reduce manual effort, and help your team 
        stay audit-ready at all times.
      </SectionTitle>

      {/* Two benefits sections */}
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      {/* Video demo */}
      <SectionTitle
        preTitle="Platform Walkthrough"
        title="See EasyComply in action"
      >
        Watch how EasyComply digitizes compliance workflows. 
        From creating tasks to assigning responsibilities, our 
        platform makes compliance stress-free for every team member.
      </SectionTitle>
     <Video videoSrc="/video.mp4" />

      {/* FAQ */}
      <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
        Got questions? We’ve compiled answers to common concerns about setup, 
        data security, pricing, and integrations. If you need more details, 
        our support team is here to help.
      </SectionTitle>
      <Faq />

      {/* Call to Action */}
      <Cta />
    </Container>
  );
}
