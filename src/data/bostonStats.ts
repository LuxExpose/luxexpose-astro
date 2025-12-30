// src/data/bostonStats.ts
export interface CityStat {
  icon: "michelin" | "landmarks" | "cultural" | "hotels" | "growth";
  label: string;
  value: string;
  description: string;
}

export const bostonStats: CityStat[] = [
  {
    icon: "hotels",        // Building2 icon
    label: "Hospital Ranking",
    value: "#3 Globally",
    description: "Harvard Medical & Mass General excellence"
  },
  {
    icon: "cultural",      // Award icon
    label: "Private Jet Terminals",
    value: "4 Terminals",
    description: "Hanscom, Logan Signature, Norwood, KBED access"
  },
  {
    icon: "landmarks",     // Landmark icon
    label: "Prime Real Estate",
    value: "$8.5M+",
    description: "Average luxury home in top neighborhoods"
  },
  {
    icon: "growth",        // TrendingUp icon
    label: "Family Offices",
    value: "200+",
    description: "Wealth management and investment hubs"
  },
  {
    icon: "growth",        // TrendingUp icon
    label: "UHNW Residents",
    value: "42,900+",
    description: "Millionaires in Boston metro region"
  },
  {
    icon: "landmarks",     // Landmark icon
    label: "Beacon Hill Premium",
    value: "$4.5M Avg",
    description: "Most exclusive ZIP code 02108"
  }
];

