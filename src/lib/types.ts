export type Vendor = {
  id: string;
  name: string;
  description: string;
  services: string[];
  certifications: string[];
  imageUrl: string;
  imageHint: string;
  sustainabilityScore: number;
};

export type LeaderboardUser = {
  rank: number;
  name: string;
  points: number;
  avatarUrl: string;
  avatarHint: string;
};
