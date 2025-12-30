// src/data/bostonExperiences.ts

export interface SignatureExperience {
  title: string;
  description: string;
  image: string;
  badge: string;
  link: string;
}

export const bostonSignatureExperiences: SignatureExperience[] = [
  {
    title: "Private Freedom Trail Tour",
    description: "Exclusive guided experience through America's revolutionary history with a renowned historian.",
    image: "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?w=800&q=80",
    badge: "ICONIC",
    link: "/boston?category=experiences"
  },
  {
    title: "Symphony Hall Private Box",
    description: "VIP access to Boston Symphony Orchestra performances in one of the world's finest concert halls.",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
    badge: "CULTURAL",
    link: "/boston?category=events"
  },
  {
    title: "Harbor Islands Yacht Charter",
    description: "Private sailing excursion through Boston Harbor's historic islands with gourmet catering.",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    badge: "EXCLUSIVE",
    link: "/boston?category=experiences"
  },
  {
    title: "Chef's Table at L'Espalier",
    description: "Intimate multi-course dining experience with one of Boston's most celebrated chefs.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    badge: "CULINARY",
    link: "/boston?category=restaurants-venues"
  }
];

