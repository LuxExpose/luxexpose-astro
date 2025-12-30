export interface SeasonalActivity {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface SeasonalContent {
  season: 'winter' | 'spring' | 'summer' | 'fall';
  activities: SeasonalActivity[];
}

export const bostonSeasonalContent: Record<string, SeasonalContent> = {
  winter: {
    season: 'winter',
    activities: [
      {
        title: "Ice Skating on Boston Common",
        description: "Glide across Frog Pond with historic charm and hot chocolate.",
        image: "https://images.unsplash.com/photo-1482909315791-2b73fcc4e672?w=800&q=80",
        link: "/boston?category=experiences"
      },
      {
        title: "Holiday Shopping on Newbury Street",
        description: "Winter window displays and luxury boutiques decked in festive splendor.",
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80",
        link: "/boston?category=shopping"
      },
      {
        title: "Cozy Fireside Dining",
        description: "Intimate winter meals at historic taverns and modern American restaurants.",
        image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&q=80",
        link: "/boston?category=restaurants-venues"
      }
    ]
  },
  spring: {
    season: 'spring',
    activities: [
      {
        title: "Boston Public Garden Swan Boats",
        description: "Pedal through blooming tulips on America's oldest public garden.",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
        link: "/boston?category=experiences"
      },
      {
        title: "Marathon Weekend Events",
        description: "Join the energy of the world's oldest annual marathon.",
        image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80",
        link: "/boston?category=events"
      },
      {
        title: "Rooftop Dining Season Opens",
        description: "Al fresco experiences with skyline views return to the city.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        link: "/boston?category=restaurants-venues"
      }
    ]
  },
  summer: {
    season: 'summer',
    activities: [
      {
        title: "Boston Harbor Sunset Cruises",
        description: "Private yacht charters through historic harbor islands.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        link: "/boston?category=experiences"
      },
      {
        title: "Boston Pops Fireworks Spectacular",
        description: "Fourth of July concert on the Esplanade with fireworks.",
        image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80",
        link: "/boston?category=events"
      },
      {
        title: "Seaport Outdoor Dining",
        description: "Waterfront terraces serving fresh seafood and cocktails.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        link: "/boston?category=restaurants-venues"
      }
    ]
  },
  fall: {
    season: 'fall',
    activities: [
      {
        title: "New England Fall Foliage Tours",
        description: "Private drives through stunning autumn colors outside the city.",
        image: "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=800&q=80",
        link: "/boston?category=experiences"
      },
      {
        title: "Head of the Charles Regatta",
        description: "World's largest two-day rowing event on the Charles River.",
        image: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800&q=80",
        link: "/boston?category=events"
      },
      {
        title: "Harvard Square Cultural Events",
        description: "Gallery openings and performances in Cambridge's heart.",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
        link: "/boston?category=arts-culture"
      }
    ]
  }
};

