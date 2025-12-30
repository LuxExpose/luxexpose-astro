// src/data/cityCopywriting.ts
export interface CityCopy {
  heroTagline: string;
  heroSubtext: string;
  explorationHeadline: string;
  explorationSubtext: string;
  categoryIntro?: string;
  experienceCallout?: string;
}

export const cityCopywriting: Record<string, CityCopy> = {
  boston: {
    heroTagline: "Discretion, Excellence, and Old Money Refinement",
    heroSubtext: "From private aviation to members-only clubs, experience Boston's understated luxury where privacy is paramount and exclusivity is earned",
    explorationHeadline: "Curated for the Ultra-High-Net-Worth",
    explorationSubtext: "Access world-class medical care, yacht marinas, investment-grade real estate, and the intellectual capital of Harvard and MIT",
    categoryIntro: "Boston's luxury scene prioritizes privacy, medical excellence, and generational wealth preservation over ostentation",
    experienceCallout: "Where UHNW individuals establish secondary residences, access elite healthcare, and build legacy networks"
  },
  miami: {
    heroTagline: "Tropical Luxury Meets International Sophistication",
    heroSubtext: "Experience Miami's vibrant luxury scene where art, culture, and world-class hospitality converge",
    explorationHeadline: "Curated for the Ultra-High-Net-Worth",
    explorationSubtext: "Access exclusive beachfront properties, private yacht clubs, and the finest dining experiences",
    categoryIntro: "Miami's luxury scene blends tropical elegance with international sophistication",
    experienceCallout: "Where global elites establish their winter residences and enjoy year-round luxury living"
  },
  nyc: {
    heroTagline: "The Pinnacle of Urban Luxury and Sophistication",
    heroSubtext: "Discover New York's unparalleled luxury scene where old-world elegance meets modern innovation",
    explorationHeadline: "Curated for the Ultra-High-Net-Worth",
    explorationSubtext: "Access exclusive penthouses, private clubs, and the world's finest cultural institutions",
    categoryIntro: "New York's luxury scene represents the ultimate in urban sophistication and exclusivity",
    experienceCallout: "Where global leaders establish their primary residences and access the world's finest everything"
  },
  doha: {
    heroTagline: "Where Tradition Meets Infinite Ambition",
    heroSubtext: "Experience Doha's unique blend of traditional Qatari culture and cutting-edge luxury",
    explorationHeadline: "Curated for the Ultra-High-Net-Worth",
    explorationSubtext: "Access exclusive desert experiences, world-class museums, and the finest Middle Eastern hospitality",
    categoryIntro: "Doha's luxury scene seamlessly blends traditional Qatari values with global sophistication",
    experienceCallout: "Where tradition and innovation create a unique luxury experience"
  }
};

export function getCityCopy(citySlug: string): CityCopy | null {
  return cityCopywriting[citySlug] || null;
}

