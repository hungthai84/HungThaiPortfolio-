import {
  Settings,
  Users2,
  TrendingUp,
  Radio,
  Users,
  Monitor,
  Gamepad2,
  ShoppingCart,
  ShieldCheck,
  Smartphone,
  Wallet,
  Volume2,
  Heart,
  Sparkles,
} from "lucide-react";

export const principlesData = [
  {
    id: "process",
    icon: Settings,
    bgClass: "from-blue-600/50 to-indigo-700/50 border-blue-400/30",
    iconBgClass: "bg-white/20 text-white",
    colorClass: "text-[#0b2853] dark:text-sky-400",
  },
  {
    id: "people",
    icon: Users2,
    bgClass: "from-amber-500/50 to-orange-600/50 border-amber-400/30",
    iconBgClass: "bg-white/20 text-white",
    colorClass: "text-[#c59b27] dark:text-amber-400",
  },
  {
    id: "technology",
    icon: TrendingUp,
    bgClass: "from-purple-600/50 to-indigo-800/50 border-purple-400/30",
    iconBgClass: "bg-white/20 text-white",
    colorClass: "text-[#0b2853] dark:text-sky-400",
  },
];

export const timelineData = [
  {
    year: "2003",
    company: "MobiFone",
    icon: Radio,
    color: "from-amber-500 to-orange-500",
  },
  {
    year: "2007",
    company: "Viễn Liên V247",
    icon: Users,
    color: "from-sky-500 to-blue-600",
  },
  {
    year: "2011",
    company: "LBC – HTV Cable",
    icon: Monitor,
    color: "from-indigo-500 to-purple-600",
  },
  {
    year: "2013",
    company: "Garena",
    icon: Gamepad2,
    color: "from-red-500 to-rose-600",
  },
  {
    year: "2015",
    company: "Shopee / AirPay",
    icon: ShoppingCart,
    color: "from-orange-500 to-amber-600",
  },
  {
    year: "2016",
    company: "Prudential",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-600",
  },
  {
    year: "2018",
    company: "MoMo",
    icon: Smartphone,
    color: "from-pink-500 to-rose-600",
  },
  {
    year: "2023",
    company: "Ví ECO",
    icon: Wallet,
    color: "from-cyan-500 to-blue-600",
  },
];

export const coreValuesData = [
  {
    id: "listen",
    icon: Volume2,
    bgClass: "from-sky-500/50 to-blue-700/50 border-sky-400/30",
    iconBgClass: "bg-white/20 text-white",
    numClass: "text-white/40",
  },
  {
    id: "empathy",
    icon: Heart,
    bgClass: "from-fuchsia-600/50 to-pink-600/50 border-pink-400/30",
    iconBgClass: "bg-white/20 text-white",
    numClass: "text-white/40",
    iconIsHeart: false,
  },
  {
    id: "serve",
    icon: Sparkles,
    bgClass: "from-emerald-500/50 to-teal-700/50 border-emerald-400/30",
    iconBgClass: "bg-white/20 text-white",
    numClass: "text-white/40",
  },
];

export const imagesData = {
  signatureUrl: "https://i.ibb.co/JWsPFKrh/Ch-k.png",
};

export const metricsData = [
  {
    value: "22+",
    labelKey: "yearsCareer",
    color: "amber",
  },
  {
    value: "CXO",
    labelKey: "mindset",
    color: "emerald",
  },
  {
    value: "99%",
    labelKey: "csatTarget",
    color: "sky",
  },
] as const;
