import {
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/benefit-one.png";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "Simplify Compliance & Onboarding",
  desc: "EasyComply makes it effortless for SMEs and EHS teams to stay compliant, manage onboarding, and ensure safety standards without the paperwork overload.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Automated Compliance Tracking",
      desc: "Get real-time visibility on checklists, safety protocols, and compliance deadlines.",
      icon: <ShieldCheckIcon className="w-6 h-6 text-brand" />,
    },
    {
      title: "Streamlined Onboarding",
      desc: "Guide new team members step-by-step through safety and compliance requirements.",
      icon: <ClipboardDocumentCheckIcon className="w-6 h-6 text-accent-green" />,
    },
    {
      title: "Team Collaboration",
      desc: "Assign tasks, track progress, and keep your entire team aligned effortlessly.",
      icon: <UserGroupIcon className="w-6 h-6 text-accent-sky" />,
    },
  ],
};

const benefitTwo = {
  title: "Automate Reporting & Stay Audit-Ready",
  desc: "With EasyComply, generate audit-ready reports instantly and reduce manual work. Spend less time on documentation and more on what matters.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile-First Access",
      desc: "Checklists, reminders, and tasks available anytime, anywhere on mobile devices.",
      icon: <DevicePhoneMobileIcon className="w-6 h-6 text-brand" />,
    },
    {
      title: "Analytics & Insights",
      desc: "Track compliance trends and identify risk areas with detailed dashboards.",
      icon: <ChartBarIcon className="w-6 h-6 text-accent-teal" />,
    },
    {
      title: "Instant Audit Reports",
      desc: "Generate professional reports for audits with just one click.",
      icon: <DocumentTextIcon className="w-6 h-6 text-accent-green" />,
    },
  ],
};

export { benefitOne, benefitTwo };
