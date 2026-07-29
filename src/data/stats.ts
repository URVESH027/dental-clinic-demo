import { Users, Award, Star, Monitor, Bone, Sparkles } from "lucide-react";

export interface Stat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
  description?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export const stats: Stat[] = [
  {
    id: "stat-1",
    label: "Happy Patients",
    value: "5000",
    suffix: "+",
    description: "Lives transformed with confident smiles",
    icon: Users,
  },
  {
    id: "stat-2",
    label: "Years Experience",
    value: "15",
    suffix: "+",
    description: "Delivering excellence in dental care",
    icon: Award,
  },
  {
    id: "stat-3",
    label: "Patient Rating",
    value: "4.9",
    suffix: "★",
    description: "Based on 2,500+ verified reviews",
    icon: Star,
  },
  {
    id: "stat-4",
    label: "Digital Equipment",
    value: "100",
    suffix: "%",
    description: "State-of-the-art technology throughout",
    icon: Monitor,
  },
  {
    id: "stat-5",
    label: "Implants Placed",
    value: "8000",
    suffix: "+",
    description: "With 99.2% success rate",
    icon: Bone,
  },
  {
    id: "stat-6",
    label: "Smile Makeovers",
    value: "1200",
    suffix: "+",
    description: "Complete transformations delivered",
    icon: Sparkles,
  },
];