"use client";
import React from "react";
import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-3xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-5 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-brand focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span className="font-medium">{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-6 h-6 text-accent-green`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-5 pt-3 pb-4 text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "What is EasyComply?",
    answer:
      "EasyComply is a digital onboarding and compliance management platform designed for SMEs and EMS teams to simplify processes, follow checklists, and stay audit-ready.",
  },
  {
    question: "Do I need technical expertise to use EasyComply?",
    answer:
      "Not at all. EasyComply is built for teams without deep technical knowledge. The platform is intuitive, and your team can start using it right away.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use enterprise-grade encryption and follow global data protection standards to ensure your compliance data and audit trails are fully secure.",
  },
  {
    question: "Can EasyComply be customized for my industry?",
    answer:
      "Absolutely. EasyComply supports industry-specific compliance workflows. You can adapt checklists and modules to match your organization's exact requirements.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes. Our support team is available to assist you with setup, training, and ongoing compliance needs.",
  },
];
