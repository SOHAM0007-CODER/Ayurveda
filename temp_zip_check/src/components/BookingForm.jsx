import React from 'react';
import { Calendar } from 'lucide-react';
import LeafButton from './LeafButton';

export default function BookingForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Consultation requested successfully! Our team will contact you shortly.');
  };

  return (
    <section className="py-24 bg-parchment min-h-[85vh] flex items-center justify-center">
      <div className="max-w-2xl w-full mx-6 bg-linen rounded-3xl shadow-xl border border-gold/20 overflow-hidden">
        <div className="bg-botanical px-8 py-8 text-center border-b border-gold/20">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">Begin Your Journey</span>
          <h3 className="font-serif text-3xl md:text-4xl text-sand mt-2">Request a Consultation</h3>
          <p className="text-sand/70 text-sm mt-3">Our care team will contact you within 24 hours.</p>
        </div>
        
        <div className="p-8 md:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-botanical mb-2 font-medium">Full Name</label>
                <input type="text" required className="w-full bg-parchment border border-gold/20 rounded-xl px-4 py-3.5 text-charcoal focus:outline-none focus:border-terracotta transition-colors text-sm shadow-sm" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-botanical mb-2 font-medium">Phone Number</label>
                <input type="tel" required className="w-full bg-parchment border border-gold/20 rounded-xl px-4 py-3.5 text-charcoal focus:outline-none focus:border-terracotta transition-colors text-sm shadow-sm" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-botanical mb-2 font-medium">Primary Health Concern</label>
              <select required className="w-full bg-parchment border border-gold/20 rounded-xl px-4 py-3.5 text-charcoal focus:outline-none focus:border-terracotta transition-colors cursor-pointer text-sm shadow-sm" defaultValue="">
                <option value="" disabled>Select your concern...</option>
                <option value="detox">Deep Detoxification (Panchakarma)</option>
                <option value="joint">Chronic Joint Pain / Arthritis</option>
                <option value="digestive">Digestive Disorders (IBS, GERD)</option>
                <option value="stress">Stress, Anxiety & Insomnia</option>
                <option value="skin">Skin Conditions (Psoriasis, Eczema)</option>
                <option value="women">Women's Health (PCOD, Fertility)</option>
                <option value="general">General Wellness & Prevention</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-botanical mb-2 font-medium">Preferred Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-sage" />
                <input type="date" className="w-full bg-parchment border border-gold/20 rounded-xl pl-12 pr-4 py-3.5 text-charcoal focus:outline-none focus:border-terracotta transition-colors text-sm shadow-sm" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-botanical mb-2 font-medium">Additional Notes (Optional)</label>
              <textarea rows="3" className="w-full bg-parchment border border-gold/20 rounded-xl px-4 py-3.5 text-charcoal focus:outline-none focus:border-terracotta transition-colors text-sm resize-none shadow-sm" placeholder="Describe your symptoms..."></textarea>
            </div>
            
            <LeafButton type="submit" variant="primary" className="w-full justify-center py-4">
              Submit Consultation Request
            </LeafButton>
            
            <p className="text-xs text-sage text-center mt-4">Your information is confidential and protected.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
