// src/data/cityIntro.ts
export interface CityIntro {
  headline: string;
  description: string;
}

export const cityIntros: Record<string, CityIntro> = {
  boston: {
    headline: "Boston Luxury Lifestyle",
    description: "Experience the pinnacle of luxury in Boston - from historic elegance to modern sophistication, discover the finest dining, accommodations, and lifestyle experiences in the Hub."
  },
  miami: {
    headline: "Miami Luxury Lifestyle", 
    description: "Experience the pinnacle of luxury in Miami - from Art Deco glamour to beachfront opulence, discover the finest dining, accommodations, and lifestyle experiences in the Magic City."
  },
  nyc: {
    headline: "New York Luxury Lifestyle",
    description: "Experience the pinnacle of luxury in New York - from Fifth Avenue elegance to Brooklyn sophistication, discover the finest dining, accommodations, and lifestyle experiences in the Big Apple."
  },
  doha: {
    headline: "Doha Luxury Lifestyle",
    description: "Experience the pinnacle of luxury in Doha - from traditional Arabian heritage to futuristic ambition, discover the finest dining, accommodations, and lifestyle experiences in Qatar's capital."
  }
};

