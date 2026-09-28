import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import LeafButton from './LeafButton';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    concern: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Namaste, I would like to book a consultation.%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0ADate: ${formData.date}%0AConcern: ${formData.concern}`;
    window.open(`https://wa.me/919999999999?text=${message}`, '_blank');
  };

  return (
    <section className="py-24 bg-dawn min-h-[85vh] flex items-center justify-center">
      <div className="max-w-2xl w-full mx-6 glass rounded-3xl overflow-hidden">
        <div className="bg-forest px-8 py-8 text-center border-b border-saffron/20">
          <span className="text-saffron text-xs uppercase tracking-[0.3em] font-medium">Begin Your Journey</span>
          <h3 className="font-serif text-3xl md:text-4xl text-dawn mt-2">Request a Consultation</h3>
          <p className="text-dawn/70 text-sm mt-3">Our care team will contact you via WhatsApp.</p>
        </div>
        
        <div className="p-8 md:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-forest mb-2 font-medium">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-dawn/50 border border-saffron/20 rounded-xl px-4 py-3.5 text-ink focus:outline-none focus:border-saffron transition-colors text-sm shadow-sm" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-forest mb-2 font-medium">Phone Number (WhatsApp)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-dawn/50 border border-saffron/20 rounded-xl px-4 py-3.5 text-ink focus:outline-none focus:border-saffron transition-colors text-sm shadow-sm" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-forest mb-2 font-medium">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-dawn/50 border border-saffron/20 rounded-xl px-4 py-3.5 text-ink focus:outline-none focus:border-saffron transition-colors text-sm shadow-sm" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-forest mb-2 font-medium">Preferred Date</label>
                <div className="relative">
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-dawn/50 border border-saffron/20 rounded-xl pl-11 pr-4 py-3.5 text-ink focus:outline-none focus:border-saffron transition-colors text-sm shadow-sm appearance-none" />
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/50" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-forest mb-2 font-medium">Primary Concern / Goal</label>
              <textarea name="concern" value={formData.concern} onChange={handleChange} required rows={3} className="w-full bg-dawn/50 border border-saffron/20 rounded-xl px-4 py-3.5 text-ink focus:outline-none focus:border-saffron transition-colors text-sm shadow-sm resize-none" placeholder="Briefly describe what you're looking for..."></textarea>
            </div>

            <LeafButton variant="primary" className="w-full justify-center shadow-lg shadow-saffron/20 mt-4">
              Send via WhatsApp
            </LeafButton>
          </form>
        </div>
      </div>
    </section>
  );
}
