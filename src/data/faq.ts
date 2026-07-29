export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What should I expect during my first visit?",
    answer: "Your first visit includes a comprehensive exam, digital X-rays, 3D scan if needed, oral cancer screening, and a consultation with your doctor. We'll discuss your goals, review findings, and create a personalized treatment plan. Please arrive 15 minutes early to complete paperwork, or fill out our online forms beforehand. Bring your insurance card and a list of any medications."
  },
  {
    id: "faq-2",
    category: "General",
    question: "Do you accept dental insurance?",
    answer: "Yes, we accept most PPO dental insurance plans and are in-network with many major providers including Delta Dental, Cigna, Aetna, MetLife, Guardian, and Principal. We'll verify your benefits before treatment and submit claims on your behalf. For out-of-network plans, we'll help you maximize your coverage. We also offer flexible financing through CareCredit, Cherry, and in-house payment plans."
  },
  {
    id: "faq-3",
    category: "General",
    question: "What are your hours of operation?",
    answer: "Monday–Thursday: 7:00 AM – 7:00 PM\nFriday: 7:00 AM – 4:00 PM\nSaturday: 8:00 AM – 2:00 PM (select Saturdays)\nSunday: Closed\n\nWe offer early morning, evening, and Saturday appointments for your convenience. Emergency patients are seen same-day during business hours, and we have an on-call dentist for after-hours emergencies for established patients."
  },
  {
    id: "faq-4",
    category: "General",
    question: "Do you offer sedation dentistry?",
    answer: "Yes, we offer multiple sedation options: Nitrous oxide (laughing gas) for mild anxiety, oral conscious sedation for moderate anxiety, and IV sedation administered by our board-certified anesthesiologist for deeper sedation or surgical procedures. General anesthesia is available at our affiliated surgical center. We'll discuss the best option for your needs and medical history."
  },
  {
    id: "faq-5",
    category: "Implants",
    question: "Am I a candidate for dental implants?",
    answer: "Most adults with missing teeth are candidates for implants. Key factors include: good general health, adequate jawbone density (or willingness to undergo bone grafting), healthy gums, and commitment to oral hygiene. Even patients with bone loss can often receive implants using advanced techniques like All-on-4, zygomatic implants, or bone regeneration. A 3D CBCT scan during your consultation will determine your specific options."
  },
  {
    id: "faq-6",
    category: "Implants",
    question: "How long do dental implants last?",
    answer: "With proper care, dental implants can last a lifetime. The titanium implant fuses with your jawbone (osseointegration) and has a 95–99% success rate over 10+ years. The crown, bridge, or denture attached to the implant may need replacement after 10–15 years due to normal wear. We offer lifetime warranties on the implant fixture itself and 5–15 year warranties on restorations depending on the material chosen."
  },
  {
    id: "faq-7",
    category: "Cosmetic",
    question: "How long do porcelain veneers last?",
    answer: "Porcelain veneers typically last 10–15+ years with proper care. They're highly stain-resistant and durable. We use premium lithium disilicate and feldspathic porcelain handcrafted by master ceramists. To maximize longevity: avoid using teeth as tools, wear a nightguard if you grind, maintain excellent oral hygiene, and attend regular checkups. We offer a 5-year warranty against chipping or debonding."
  },
  {
    id: "faq-8",
    category: "Cosmetic",
    question: "Is teeth whitening safe for sensitive teeth?",
    answer: "Yes! We customize whitening for sensitive teeth using desensitizing pre-treatment, lower concentration gels, and shorter wear times. Our in-office Zoom! WhiteSpeed includes a desensitizing protocol, and our take-home kits include potassium nitrate and fluoride for sensitivity management. Most patients with sensitivity achieve excellent results comfortably."
  },
  {
    id: "faq-9",
    category: "Orthodontics",
    question: "How long does Invisalign treatment take?",
    answer: "Treatment duration varies by case complexity: mild cases 6–12 months, moderate 12–18 months, complex 18–24+ months. As a Diamond Plus Invisalign Provider (top 1% worldwide), Dr. Rodriguez optimizes treatment efficiency. You'll see a 3D simulation of your predicted results before starting. Aligners are changed weekly, with checkups every 8–12 weeks. Virtual monitoring is available for busy patients."
  },
  {
    id: "faq-10",
    category: "Orthodontics",
    question: "At what age should my child first see an orthodontist?",
    answer: "The American Association of Orthodontists recommends a first orthodontic evaluation by age 7. Early evaluation doesn't mean early treatment—it allows us to monitor growth and intervene at the optimal time if needed. Some issues like crossbites, severe crowding, or habits (thumb sucking) benefit from early interceptive treatment (Phase 1) to simplify later treatment."
  },
  {
    id: "faq-11",
    category: "Pediatric",
    question: "When should my child have their first dental visit?",
    answer: "The American Academy of Pediatric Dentistry recommends the first visit by age 1 or within 6 months of the first tooth erupting. Early visits establish a 'dental home,' allow us to monitor development, provide preventive guidance on nutrition and hygiene, and help your child build positive associations with dental care. Our pediatric wing is designed to make first visits fun and stress-free."
  },
  {
    id: "faq-12",
    category: "Pediatric",
    question: "Do you treat children with special needs?",
    answer: "Absolutely. Dr. Thompson has specialized training in treating patients with autism, Down syndrome, cerebral palsy, sensory processing disorders, anxiety, and other special healthcare needs. Our pediatric wing is sensory-friendly with dimmable lights, noise-canceling headphones, weighted blankets, and private rooms. We offer desensitization visits, social stories, and sedation options. Every child deserves excellent dental care tailored to their unique needs."
  },
  {
    id: "faq-13",
    category: "Emergency",
    question: "What should I do for a knocked-out tooth?",
    answer: "Time is critical—the best chance of saving the tooth is within 30–60 minutes. Handle the tooth by the crown (white part), not the root. If dirty, gently rinse with milk or saline—do NOT scrub or use water. Try to reinsert it into the socket, or place it in milk, saliva, or a tooth preservation kit (Save-A-Tooth). Call us immediately at (555) 123-4567 for emergency care. We reserve same-day slots for dental trauma."
  },
  {
    id: "faq-14",
    category: "Emergency",
    question: "Do you see emergency patients who aren't current patients?",
    answer: "Yes! We welcome new patients for emergencies and reserve daily emergency slots. Call (555) 123-4567 as early as possible for same-day availability. For after-hours emergencies (severe swelling, trauma, uncontrolled bleeding), our on-call dentist can be reached through our answering service. We'll provide immediate pain relief and definitive treatment, and you're welcome to continue your care with us afterward."
  },
  {
    id: "faq-15",
    category: "Financial",
    question: "What payment options do you offer?",
    answer: "We accept: Cash, Check, Visa, MasterCard, American Express, Discover, HSA/FSA cards. Financing: CareCredit (6–24 months no interest), Cherry (0% APR options), In-house payment plans (split over 3–6 months for treatment over $500). We also offer a 5% courtesy discount for full payment at time of service (cash/check) and a 10% senior discount (65+) for non-insurance patients."
  },
  {
    id: "faq-16",
    category: "Financial",
    question: "Can I use my HSA/FSA for dental treatment?",
    answer: "Yes! Most dental treatments are HSA/FSA eligible including: exams, cleanings, fillings, crowns, implants, orthodontics, periodontics, and oral surgery. Cosmetic procedures like veneers and whitening are typically NOT eligible unless medically necessary. We provide detailed receipts with procedure codes for your reimbursement. Check with your plan administrator for specific coverage details."
  },
  {
    id: "faq-17",
    category: "Technology",
    question: "What makes your technology different?",
    answer: "We've invested in premium technology for precision, comfort, and results: CBCT 3D imaging (low radiation), iTero 5D intraoral scanner (no goopy impressions), CEREC Primescan/mill (same-day crowns), surgical microscopes (25x magnification), dental lasers (LANAP, soft tissue), digital smile design software, 3D printing lab, and guided surgery navigation. This means fewer visits, better outcomes, and a more comfortable experience."
  },
  {
    id: "faq-18",
    category: "Technology",
    question: "Are digital X-rays safe?",
    answer: "Absolutely. Our digital radiography uses up to 90% less radiation than traditional film X-rays. A full mouth series exposes you to roughly the same radiation as a 2-hour airplane flight or a day of natural background radiation. We follow ALARA principles (As Low As Reasonably Achievable)—taking only necessary images with thyroid collars and lead aprons. CBCT 3D scans use slightly more radiation but provide invaluable diagnostic information for complex procedures."
  }
];

export const faqCategories = [
  "All",
  "General",
  "Implants",
  "Cosmetic",
  "Orthodontics",
  "Pediatric",
  "Emergency",
  "Financial",
  "Technology"
];