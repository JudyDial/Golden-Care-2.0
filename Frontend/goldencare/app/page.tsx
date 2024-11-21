"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Heart, Activity, Calendar, Bell, Download } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { HealthCheckModal } from '@/components/modals/health-check-modal'
export default function LandingPage() {
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [message, setmessage] = useState('');
  const router = useRouter()

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("All fields are required!");
      return;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">SilverWatch</h1>
          <nav className="flex space-x-4 items-center">
            <ul className="flex space-x-4">
              <li><Link href="#features" className="hover:underline">Features</Link></li>
              <li><Link href="#testimonials" className="hover:underline">Testimonials</Link></li>
              <li><Link href="#faq" className="hover:underline">FAQ</Link></li>
              <li><Link href="#contact" className="hover:underline">Contact</Link></li>
            </ul>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100" onClick={() => { router.push('/Login') }}>Login</Button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-blue-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Monitor Your Health in Real-Time</h2>
            <p className="text-xl mb-8">Stay connected to your health with SilverWatch&apos;s advanced remote monitoring system.</p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100" onClick={() => { router.push('/Register') }}>Get Started</Button>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard icon={<Heart />} title="Vitals Monitoring" description="Track your heart rate, blood pressure, and oxygen levels in real-time." />
              <FeatureCard icon={<Activity />} title="Activity Tracking" description="Monitor your daily activity levels and step count." />
              <FeatureCard icon={<Calendar />} title="Appointment Scheduling" description="Easily book and manage appointments with your caregivers." />
              <FeatureCard icon={<Bell />} title="Alerts & Notifications" description="Receive timely alerts for critical vitals and medication reminders." />
            </div>
          </div>
        </section>
        {/* Health Check modal */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">AI-Powered Health Risk Assessment</h2>
              <p className="text-xl mb-8">
                Utilize our state-of-the-art AI model to assess your risk of diabetes or hypertension. Get personalized insights based on your health data.
              </p>
              <div className="flex justify-center space-x-4">
                <HealthCheckModal />
                <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-100">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section id="testimonials" className="bg-blue-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard name="John D." quote="SilverWatch has given me peace of mind knowing that my health is being monitored 24/7." />
              <TestimonialCard name="Sarah M." quote="The easy-to-use interface makes tracking my vitals and medications a breeze." />
              <TestimonialCard name="Robert L." quote="I love how I can easily share my health data with my doctor. It&APOS;s improved my care significantly." />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does SilverWatch work?</AccordionTrigger>
                <AccordionContent>
                  SilverWatch uses advanced sensors and wearable technology to monitor your vital signs and activity levels. This data is securely transmitted to our platform, where it&APOS;s analyzed and presented in an easy-to-understand format.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is my health data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security very seriously. All your health information is encrypted and stored securely in compliance with HIPAA regulations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I share my data with my doctor?</AccordionTrigger>
                <AccordionContent>
                  SilverWatch makes it easy to share your health data with your healthcare providers, ensuring they have the most up-to-date information about your health status.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-blue-500 text-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
            <form className="max-w-md mx-auto" onSubmit={HandleSubmit}>
              <div className="mb-4">
                <Input type="text" placeholder="Your Name" className="w-full text-black" onChange={e => setName(e.target.value)} />
              </div>
              <div className="mb-4">
                <Input type="email" placeholder="Your Email" className="w-full text-black" onChange={e => setemail(e.target.value)} />
              </div>
              <div className="mb-4">
                <textarea className="w-full p-2 rounded text-black" rows={4} placeholder="Your Message" onChange={e => setmessage(e.target.value)} ></textarea>
              </div>
              <Button type="submit" className="w-full bg-white text-blue-600 hover:bg-blue-100">Send Message</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">SilverWatch</h3>
              <p>Empowering you to take control of your health.</p>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul>
                <li><Link href="#features" className="hover:underline">Features</Link></li>
                <li><Link href="#testimonials" className="hover:underline">Testimonials</Link></li>
                <li><Link href="#faq" className="hover:underline">FAQ</Link></li>
                <li><Link href="#contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-2">Download Our App</h4>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex items-center text-blue-700 hover:bg-blue-100">
                  <Download className="mr-2" size={16} />
                  App Store
                </Button>
                <Button variant="outline" className="flex items-center text-blue-700 hover:bg-blue-100">
                  <Download className="mr-2" size={16} />
                  Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center border border-blue-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition">
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  quote: string;
}

function TestimonialCard({ name, quote }: TestimonialCardProps) {
  return (
    <div className="border border-blue-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition">
      <p className="italic mb-4">&quot;{quote}&quot;</p>
      <h4 className="text-lg font-semibold text-right">- {name}</h4>
    </div>
  );
}
