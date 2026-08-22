export interface WallpaperOption {
  id: string;
  name: string;
  url?: string;
  previewUrl: string;
  type?: "image" | "video" | "css";
  cssClass?: string;
  category?: "minimal" | "nature" | "abstract" | "tech" | "gradient" | "custom";
  tags?: string[];
  author?: string;
  isCustom?: boolean;
}

export const PRESET_WALLPAPERS: WallpaperOption[] = [
  {
    id: "none",
    name: "🚫 Không Dùng Hình Nền (Xóa Hình Nền / Plain Mica)",
    type: "css",
    cssClass: "bg-slate-100 dark:bg-slate-950",
    previewUrl: "",
    category: "minimal",
    tags: ["minimal", "plain", "mica", "neutral"],
  },
  // --- VIDEO WALLPAPERS ---
  {
    id: "vid-wp-1",
    name: "Ocean Waves (Video Live)",
    url: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
    previewUrl:
      "https://images.pexels.com/videos/853889/free-video-853889.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    type: "video",
    category: "nature",
    tags: ["ocean", "waves", "sea", "video", "live", "water"],
  },
  {
    id: "vid-wp-2",
    name: "Abstract Ink / Fluid Colors (Video Live)",
    url: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-21950-large.mp4",
    previewUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    type: "video",
    category: "abstract",
    tags: ["abstract", "ink", "fluid", "video", "live", "swirl"],
  },
  {
    id: "vid-wp-3",
    name: "Fluid Colors Motion (Video Live)",
    url: "https://cdn.pixabay.com/video/2021/08/04/83896-584742516_large.mp4",
    previewUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    type: "video",
    category: "abstract",
    tags: ["abstract", "fluid", "colors", "motion", "video", "live"],
  },
  // --- IMAGE WALLPAPERS ---
  {
    id: "img-wp-1",
    name: "Minimalist White Bright Space",
    url: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    previewUrl:
      "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "white", "clean", "bright", "4k"],
  },
  {
    id: "img-wp-2",
    name: "Geometric Mountain Calming Visuals",
    url: "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
    previewUrl:
      "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
    type: "image",
    category: "nature",
    tags: ["geometric", "mountain", "calm", "landscape", "4k"],
  },
  {
    id: "img-wp-3",
    name: "Aesthetic Landscape 15",
    url: "https://i.ibb.co/R4P1zff0/ta-i-xu-ng-15.jpg",
    previewUrl: "https://i.ibb.co/R4P1zff0/ta-i-xu-ng-15.jpg",
    type: "image",
    category: "nature",
    tags: ["aesthetic", "landscape", "nature", "scenic"],
  },
  {
    id: "img-wp-4",
    name: "Aesthetic Landscape 14",
    url: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    previewUrl: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    type: "image",
    category: "nature",
    tags: ["aesthetic", "nature", "mountains"],
  },
  {
    id: "img-wp-5",
    name: "Aesthetic Landscape 13",
    url: "https://i.ibb.co/S49fBKcv/ta-i-xu-ng-13.jpg",
    previewUrl: "https://i.ibb.co/S49fBKcv/ta-i-xu-ng-13.jpg",
    type: "image",
    category: "nature",
    tags: ["sunset", "nature", "scenic"],
  },
  {
    id: "img-wp-6",
    name: "Aesthetic Landscape 12",
    url: "https://i.ibb.co/04qypw8/ta-i-xu-ng-12.jpg",
    previewUrl: "https://i.ibb.co/04qypw8/ta-i-xu-ng-12.jpg",
    type: "image",
    category: "nature",
    tags: ["minimal", "mountains", "clean"],
  },
  {
    id: "img-wp-7",
    name: "Pearlescent Abstract Hues",
    url: "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    previewUrl:
      "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    type: "image",
    category: "abstract",
    tags: ["pearlescent", "abstract", "pastel", "fluent"],
  },
  {
    id: "img-wp-8",
    name: "Best Premium Wallpaper",
    url: "https://i.ibb.co/d0Fw0xdW/Best-wallpaper-1.jpg",
    previewUrl: "https://i.ibb.co/d0Fw0xdW/Best-wallpaper-1.jpg",
    type: "image",
    category: "minimal",
    tags: ["premium", "abstract", "fluent"],
  },
  {
    id: "img-wp-9",
    name: "Minimal Aesthetic Gradient 2",
    url: "https://i.ibb.co/rKL4ffH2/2.jpg",
    previewUrl: "https://i.ibb.co/rKL4ffH2/2.jpg",
    type: "image",
    category: "gradient",
    tags: ["gradient", "minimal", "clean"],
  },
  {
    id: "img-wp-10",
    name: "Soft Pastel Atmosphere 12",
    url: "https://i.ibb.co/nq9GHB11/ta-i-xu-ng-12.jpg",
    previewUrl: "https://i.ibb.co/nq9GHB11/ta-i-xu-ng-12.jpg",
    type: "image",
    category: "abstract",
    tags: ["pastel", "soft", "calm"],
  },
  {
    id: "img-wp-11",
    name: "Abstract Silvery Pearlescent Minimal",
    url: "https://i.ibb.co/PZhKjDjP/Abstract-minimalistic-background-image-with-minimal-details-in-silvery-pearlescent-hues-subtle-tex.jpg",
    previewUrl:
      "https://i.ibb.co/PZhKjDjP/Abstract-minimalistic-background-image-with-minimal-details-in-silvery-pearlescent-hues-subtle-tex.jpg",
    type: "image",
    category: "minimal",
    tags: ["silvery", "pearlescent", "minimal", "monochrome"],
  },
  {
    id: "img-wp-12",
    name: "Clean Aesthetic Wallpaper",
    url: "https://i.ibb.co/Fc1dczn/Wallpaper.jpg",
    previewUrl: "https://i.ibb.co/Fc1dczn/Wallpaper.jpg",
    type: "image",
    category: "minimal",
    tags: ["clean", "aesthetic", "bright"],
  },
  {
    id: "img-wp-13",
    name: "Soft Atmosphere 15",
    url: "https://i.ibb.co/DDCj9TBk/ta-i-xu-ng-15.jpg",
    previewUrl: "https://i.ibb.co/DDCj9TBk/ta-i-xu-ng-15.jpg",
    type: "image",
    category: "abstract",
    tags: ["soft", "atmosphere", "smooth"],
  },
  {
    id: "img-wp-14",
    name: "Pastel Minimal Clean Aesthetic",
    url: "https://i.ibb.co/jPN1bS9c/Pastel-Minimal-Wallpaper-Clean-Aesthetic-for-Mac-Book.jpg",
    previewUrl:
      "https://i.ibb.co/jPN1bS9c/Pastel-Minimal-Wallpaper-Clean-Aesthetic-for-Mac-Book.jpg",
    type: "image",
    category: "minimal",
    tags: ["pastel", "macbook", "minimal", "clean"],
  },
  {
    id: "img-wp-15",
    name: "Soft Atmosphere 14",
    url: "https://i.ibb.co/chRZYCFs/ta-i-xu-ng-14.jpg",
    previewUrl: "https://i.ibb.co/chRZYCFs/ta-i-xu-ng-14.jpg",
    type: "image",
    category: "abstract",
    tags: ["soft", "light", "airy"],
  },
  {
    id: "img-wp-16",
    name: "Soft Atmosphere 13",
    url: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    previewUrl: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    type: "image",
    category: "abstract",
    tags: ["calm", "relax", "soft"],
  },
  {
    id: "img-wp-17",
    name: "Soft Atmosphere 16",
    url: "https://i.ibb.co/G4tGQZbB/ta-i-xu-ng-16.jpg",
    previewUrl: "https://i.ibb.co/G4tGQZbB/ta-i-xu-ng-16.jpg",
    type: "image",
    category: "abstract",
    tags: ["neutral", "calm"],
  },
  {
    id: "img-wp-18",
    name: "Abstract Gradient Circle",
    url: "https://i.ibb.co/r2w5qZCT/Download-Abstract-Gradient-Circle-Background-for-free.jpg",
    previewUrl:
      "https://i.ibb.co/r2w5qZCT/Download-Abstract-Gradient-Circle-Background-for-free.jpg",
    type: "image",
    category: "gradient",
    tags: ["circle", "gradient", "colorful"],
  },
  {
    id: "img-wp-19",
    name: "Mental Peace Rest Minimal",
    url: "https://i.ibb.co/zhc5bK7G/Ton-mental-a-aussi-besoin-de-repos.jpg",
    previewUrl:
      "https://i.ibb.co/zhc5bK7G/Ton-mental-a-aussi-besoin-de-repos.jpg",
    type: "image",
    category: "minimal",
    tags: ["peace", "mindful", "minimal"],
  },
  {
    id: "img-wp-20",
    name: "Serene Alpine Mountain Sunrise",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=3840&auto=format&fit=crop",
    previewUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    type: "image",
    category: "nature",
    tags: ["mountain", "sunrise", "alpine", "4k", "nature"],
  },
  {
    id: "img-wp-21",
    name: "Cosmic Nebula Stardust Dreamscape",
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=3840&auto=format&fit=crop",
    previewUrl:
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop",
    type: "image",
    category: "tech",
    tags: ["cosmic", "galaxy", "stars", "space", "nebula"],
  },
  {
    id: "img-wp-22",
    name: "Minimalist Architecture Warm Sunlight",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=3840&auto=format&fit=crop",
    previewUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    type: "image",
    category: "minimal",
    tags: ["architecture", "sunlight", "minimal", "interior"],
  },
  {
    id: "img-wp-23",
    name: "Zen Bamboo Forest Calm Ambience",
    url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=3840&auto=format&fit=crop",
    previewUrl:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop",
    type: "image",
    category: "nature",
    tags: ["zen", "bamboo", "forest", "nature", "green"],
  },
  {
    id: "img-wp-24",
    name: "Cyberpunk Neon Tokyo Cityscape",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=3840&auto=format&fit=crop",
    previewUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    type: "image",
    category: "tech",
    tags: ["cyberpunk", "neon", "city", "night", "tokyo"],
  },
  {
    id: "img-wp-25",
    name: "Golden Hour Ocean Waves Minimal",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3840&auto=format&fit=crop",
    previewUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    type: "image",
    category: "nature",
    tags: ["ocean", "waves", "beach", "sunset", "golden"],
  },
  {
    id: "img-wp-26",
    name: "Ocean Coastline Sunny Horizon",
    url: "https://images.pexels.com/videos/853889/free-video-853889.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    previewUrl:
      "https://images.pexels.com/videos/853889/free-video-853889.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    type: "image",
    category: "nature",
    tags: ["ocean", "coastline", "sunny", "nature"],
  },
  {
    id: "img-wp-27",
    name: "Abstract Ink Flow Fluid Art",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    previewUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    type: "image",
    category: "abstract",
    tags: ["abstract", "ink", "fluid", "modern"],
  },
];

export const QUICK_PRESET_TEMPLATES = [
  {
    name: "Tokyo Rainy Neon Night (4K)",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=3840&auto=format&fit=crop",
    category: "tech" as const,
    tags: ["rain", "neon", "tokyo", "4k"],
  },
  {
    name: "Emerald Aurora Borealis (4K)",
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=3840&auto=format&fit=crop",
    category: "nature" as const,
    tags: ["aurora", "green", "night", "stars"],
  },
  {
    name: "Minimalist Soft Desert Dunes (4K)",
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=3840&auto=format&fit=crop",
    category: "minimal" as const,
    tags: ["desert", "dunes", "warm", "minimal"],
  },
  {
    name: "Deep Ocean Dark Blue Abyss (4K)",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=3840&auto=format&fit=crop",
    category: "nature" as const,
    tags: ["ocean", "water", "blue", "calm"],
  },
];
