
import { Leaf, Globe, BarChart, LifeBuoy, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-green-50 text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-green-800">
              Evergreen Events
            </Link>
          </div>
          <div className="hidden md:flex flex-grow justify-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-green-700 transition">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-green-700 transition">How It Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-green-700 transition">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-green-700 transition">Contact</a>
          </div>
          <div className="flex-shrink-0 flex space-x-4">
            <Link href="/login" className="px-4 py-2 text-green-700 border border-green-700 rounded-lg hover:bg-green-700 hover:text-white transition">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center text-center px-4 relative bg-cover bg-center" style={{ backgroundImage: "url('/images/nature-bg.jpg')" }}>
        <div className="absolute inset-0 bg-green-900/50"></div>
        <div className="max-w-3xl relative z-10 mt-20 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Host Unforgettable, Sustainable Events</h1>
          <p className="text-lg md:text-xl mb-8 text-green-100">Your all-in-one platform for creating and managing events that are both memorable and eco-friendly.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup" className="px-8 py-4 text-lg font-semibold text-green-800 bg-white rounded-xl shadow-lg transition hover:scale-105">
              Create an Event
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-800">Why Choose Evergreen?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-green-50/70 border border-green-200 shadow-lg">
              <Leaf className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-semibold mb-2 text-green-900">Eco-Friendly Focus</h3>
              <p className="text-gray-600">Tools and tips to help you host sustainable and responsible events.</p>
            </div>
            <div className="p-8 rounded-2xl bg-green-50/70 border border-green-200 shadow-lg">
              <Globe className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-semibold mb-2 text-green-900">Global & Local</h3>
              <p className="text-gray-600">Easily manage events anywhere in the world, in any language.</p>
            </div>
            <div className="p-8 rounded-2xl bg-green-50/70 border border-green-200 shadow-lg">
              <BarChart className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-semibold mb-2 text-green-900">Attendee Analytics</h3>
              <p className="text-gray-600">Gain insights into your audience and event performance with powerful analytics.</p>
            </div>
            <div className="p-8 rounded-2xl bg-green-50/70 border border-green-200 shadow-lg">
              <LifeBuoy className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-semibold mb-2 text-green-900">24/7 Support</h3>
              <p className="text-gray-600">Our team is always here to help you every step of the way.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 text-green-800">Get Started in 3 Easy Steps</h2>
            <div className="grid md:grid-cols-3 gap-12 text-left relative">
                {/* Dashed line */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full border-t-2 border-dashed border-green-300 -translate-y-1/2"></div>
                
                <div className="relative z-10 p-8 bg-white rounded-xl shadow-lg border-t-4 border-green-500">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">1</div>
                    <h3 className="text-2xl font-semibold mt-6 mb-3 text-green-900">Create Your Account</h3>
                    <p className="text-gray-600">Sign up for free and set up your organizer profile in minutes.</p>
                </div>
                <div className="relative z-10 p-8 bg-white rounded-xl shadow-lg border-t-4 border-green-500">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">2</div>
                    <h3 className="text-2xl font-semibold mt-6 mb-3 text-green-900">Launch Your Event</h3>
                    <p className="text-gray-600">Use our intuitive tools to design your event page and start selling tickets.</p>
                </div>
                <div className="relative z-10 p-8 bg-white rounded-xl shadow-lg border-t-4 border-green-500">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">3</div>
                    <h3 className="text-2xl font-semibold mt-6 mb-3 text-green-900">Go Live!</h3>
                    <p className="text-gray-600">Host your event and engage with your community, sustainably.</p>
                </div>
            </div>
        </div>
    </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-green-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Loved by Organizers Worldwide</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/20 p-8 rounded-xl">
              <p className="italic mb-4">"Evergreen Events made our annual conference a breeze. The platform is intuitive, and their focus on sustainability is a huge plus for our brand."</p>
              <p className="font-bold">- Jane Doe, Eco-Conferences Inc.</p>
            </div>
            <div className="bg-white/20 p-8 rounded-xl">
              <p className="italic mb-4">"Finally, an event platform that aligns with our values. Managing volunteers and vendors has never been easier."</p>
              <p className="font-bold">- John Smith, GreenFest Organizers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-800">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-900">We're here to help!</h3>
              <p className="text-gray-600 mb-6">Have a question or need support? Fill out the form or reach out to us directly.</p>
              <p className="flex items-center mb-2"><MapPin className="w-5 h-5 mr-3 text-green-600"/>Bangalore, India</p>
              <p className="flex items-center mb-2"><Mail className="w-5 h-5 mr-3 text-green-600"/><a href="mailto:support@evergreenevents.com" className="hover:underline">support@evergreenevents.com</a></p>
              <p className="flex items-center"><Phone className="w-5 h-5 mr-3 text-green-600"/><a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a></p>
            </div>
            <div className="bg-green-50/70 p-8 rounded-2xl shadow-lg border border-green-200">
              <form>
                <input type="text" placeholder="Your Name" className="w-full mb-4 px-4 py-3 rounded-lg bg-white text-gray-800 border border-green-300 focus:ring-2 focus:ring-green-500" />
                <input type="email" placeholder="Your Email" className="w-full mb-4 px-4 py-3 rounded-lg bg-white text-gray-800 border border-green-300 focus:ring-2 focus:ring-green-500" />
                <textarea placeholder="Your Message" rows={4} className="w-full mb-4 px-4 py-3 rounded-lg bg-white text-gray-800 border border-green-300 focus:ring-2 focus:ring-green-500"></textarea>
                <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-green-100 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Evergreen Events. Creating a greener tomorrow, one event at a time. 🌿</p>
      </footer>
    </div>
  );
}
