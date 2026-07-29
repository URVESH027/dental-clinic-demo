export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  price: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  education: string[];
  experience: string;
  memberships?: string[];
  languages?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  service: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Technology {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  benefits: string[];
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ServiceOption {
  value: string;
  label: string;
}

export interface TimeSlot {
  value: string;
  label: string;
}

export interface ServiceOptions {
  services: ServiceOption[];
  timeSlots: TimeSlot[];
}