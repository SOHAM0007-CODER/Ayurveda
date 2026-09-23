import React, { useState } from 'react';
import LeafButton from './LeafButton';

const questions = [
  {
    id: 'frame',
    question: 'How would you describe your body frame?',
    options: [
      { label: 'Thin, lean, hard to gain weight', dosha: 'Vata' },
      { label: 'Medium build, athletic, muscular', dosha: 'Pitta' },
      { label: 'Broad, sturdy, easily gain weight', dosha: 'Kapha' }
    ]
  },
  {
    id: 'skin',
    question: 'What is your skin type like?',
    options: [
      { label: 'Dry, rough, cool to touch', dosha: 'Vata' },
      { label: 'Warm, reddish, prone to acne or freckles', dosha: 'Pitta' },
      { label: 'Thick, oily, cool and pale', dosha: 'Kapha' }
    ]
  },
  {
    id: 'sleep',
    question: 'How do you usually sleep?',
    options: [
      { label: 'Light sleeper, easily awakened, restless', dosha: 'Vata' },
      { label: 'Sound sleeper, but can wake up hot', dosha: 'Pitta' },
      { label: 'Deep, heavy sleeper, hard to wake up', dosha: 'Kapha' }
    ]
  },
  {
    id: 'digestion',
    question: 'Describe your digestion and appetite:',
    options: [
      { label: 'Irregular, prone to gas and bloating', dosha: 'Vata' },
      { label: 'Strong, intense hunger, prone to acidity', dosha: 'Pitta' },
      { label: 'Slow but steady, can skip meals easily', dosha: 'Kapha' }
    ]
  },
  {
    id: 'mind',
    question: 'Under stress, how do you react?',
    options: [
      { label: 'Anxious, worried, fearful', dosha: 'Vata' },
      { label: 'Irritable, angry, frustrated', dosha: 'Pitta' },
      { label: 'Withdrawn, stubborn, depressed', dosha: 'Kapha' }
    ]
  }
];

export default function DoshaTest() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelect = (questionId, dosha) => {
    setAnswers({ ...answers, [questionId]: dosha });
  };

  const calculateDosha = () => {
    const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
    Object.values(answers).forEach(dosha => counts[dosha]++);
    
    // Find the highest count
    let max = 0;
    let primaryDosha = '';
    for (const [dosha, count] of Object.entries(counts)) {
      if (count > max) {
        max = count;
        primaryDosha = dosha;
      }
    }
    
    setResult({ primary: primaryDosha, breakdown: counts });
  };

  const doshaDescriptions = {
    Vata: 'You are dominated by Air and Space. You are creative, energetic, and adaptable, but prone to anxiety, dry skin, and irregular digestion when out of balance. Focus on warm, grounding foods and routine.',
    Pitta: 'You are dominated by Fire and Water. You are intelligent, driven, and natural leaders, but prone to inflammation, acidity, and irritability when out of balance. Focus on cooling foods and stress management.',
    Kapha: 'You are dominated by Earth and Water. You are calm, loving, and possess great stamina, but prone to lethargy, weight gain, and congestion when out of balance. Focus on light, stimulating foods and vigorous exercise.'
  };

  return (
    <section className="py-20 bg-parchment min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-terracotta text-xs uppercase tracking-[0.3em] font-medium">Discover Your Nature</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-4 text-botanical">Prakriti (Dosha) Assessment</h2>
          <p className="text-lg text-charcoal/60 leading-relaxed">Take this simple traditional quiz to discover your unique mind-body constitution and receive personalized lifestyle guidance.</p>
        </div>

        {!result ? (
          <div className="bg-linen rounded-3xl p-8 md:p-12 border border-gold/20 shadow-sm">
            {questions.map((q, idx) => (
              <div key={q.id} className="mb-10 last:mb-0">
                <h4 className="font-serif text-2xl text-botanical mb-4">{idx + 1}. {q.question}</h4>
                <div className="flex flex-col gap-3">
                  {q.options.map((opt, i) => (
                    <label key={i} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${answers[q.id] === opt.dosha ? 'bg-botanical/10 border-botanical text-botanical' : 'bg-parchment border-gold/15 hover:border-terracotta/30 text-charcoal/80'}`}>
                      <input 
                        type="radio" 
                        name={q.id} 
                        value={opt.dosha} 
                        checked={answers[q.id] === opt.dosha}
                        onChange={() => handleSelect(q.id, opt.dosha)}
                        className="w-5 h-5 accent-terracotta"
                      />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="mt-12 text-center">
              <LeafButton 
                onClick={calculateDosha} 
                variant="primary"
                className={Object.keys(answers).length < questions.length ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Analyze My Prakriti
              </LeafButton>
              {Object.keys(answers).length < questions.length && (
                <p className="text-terracotta text-xs mt-3">Please answer all questions to see your result.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-botanical rounded-3xl p-10 md:p-16 text-center shadow-lg border border-gold/20">
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">Your Primary Dosha Is</span>
            <h3 className="font-serif text-6xl text-sand mt-4 mb-8">{result.primary}</h3>
            <p className="text-sand/80 leading-relaxed text-lg max-w-2xl mx-auto mb-10">
              {doshaDescriptions[result.primary]}
            </p>
            
            <div className="flex justify-center gap-8 mb-12 border-y border-gold/20 py-6 max-w-lg mx-auto">
              <div className="text-sand"><span className="block text-2xl font-serif text-gold">{result.breakdown.Vata}</span> Vata</div>
              <div className="text-sand"><span className="block text-2xl font-serif text-gold">{result.breakdown.Pitta}</span> Pitta</div>
              <div className="text-sand"><span className="block text-2xl font-serif text-gold">{result.breakdown.Kapha}</span> Kapha</div>
            </div>

            <LeafButton onClick={() => {setResult(null); setAnswers({});}} variant="outline" className="border-sand text-sand hover:bg-sand/10">
              Retake Assessment
            </LeafButton>
          </div>
        )}
      </div>
    </section>
  );
}
