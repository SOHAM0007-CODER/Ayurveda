import React from 'react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import BookingForm from '../components/BookingForm';
import { siteConfig } from '../config/siteConfig';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div>
      <SEO 
        title="Contact Us" 
        description="Reach out to Swasthyam Ayurved to schedule a consultation or ask any questions."
        url="/contact"
      />
      
      <PageHero 
        title="Contact Us" 
        sanskritTitle="सम्पर्क"
        description="We are here to assist you on your journey to holistic health. Reach out to schedule a consultation."
        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-24 bg-linen">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Details */}
          <div>
            <SectionHeading subtitle="Get in Touch" title="Clinic Information" align="left" />
            
            <div className="space-y-8 mt-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-botanical/10 text-botanical flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-botanical mb-2">Visit Us</h4>
                  <p className="text-charcoal/70 whitespace-pre-line leading-relaxed">{siteConfig.address}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-botanical/10 text-botanical flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-botanical mb-2">Call Us</h4>
                  <a href={`tel:${siteConfig.phone}`} className="text-charcoal/70 hover:text-terracotta transition-colors block mb-1">{siteConfig.phone}</a>
                  <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" className="text-terracotta text-sm font-medium hover:underline">WhatsApp Us</a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-botanical/10 text-botanical flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-botanical mb-2">Email Us</h4>
                  <a href={`mailto:${siteConfig.email}`} className="text-charcoal/70 hover:text-terracotta transition-colors">{siteConfig.email}</a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-botanical/10 text-botanical flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-botanical mb-2">Clinic Timings</h4>
                  <p className="text-charcoal/70">{siteConfig.timings}</p>
                  <p className="text-charcoal/70 text-sm mt-1">{siteConfig.closedDays}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 w-full h-[300px] rounded-3xl overflow-hidden border border-gold/20 shadow-md">
              <iframe 
                src={siteConfig.mapEmbedUrl !== 'TODO: Google maps embed URL' ? siteConfig.mapEmbedUrl : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119981.38318251239!2d73.70817926888636!3d18.524564858971708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin'}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Map"
              ></iframe>
            </div>
          </div>

          {/* Booking Form Side */}
          <div className="bg-parchment p-8 md:p-12 rounded-[40px] border border-gold/20 shadow-xl h-fit">
            <h3 className="font-serif text-3xl text-botanical mb-2">Book a Consultation</h3>
            <p className="text-charcoal/60 text-sm mb-8">Fill out the form below or contact us via WhatsApp to secure your appointment.</p>
            <BookingForm compact={true} />
          </div>

        </div>
      </section>
    </div>
  );
}
