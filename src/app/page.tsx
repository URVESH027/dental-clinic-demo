import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Creating Confident Smiles for Every Generation",
  description: "Advanced dental care at Thousand Smile Dental Clinic. Implants, cosmetic, orthodontics, pediatrics & emergency care. Board-certified specialists. Book today.",
};

export default function Home() {
  return <HomeClient />;
}