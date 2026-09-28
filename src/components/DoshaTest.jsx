import React, { useState } from 'react';
import LeafButton from './LeafButton';
import { Reveal, SplitHeading } from '../motion/MotionKit';

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
    
    // Find the highest count(s)
    let max = 0;
    let primaryDoshas = [];
    for (const [dosha, count] of Object.entries(counts)) {
      if (count > max) {
        max = count;
        primaryDoshas = [dosha];
      } else if (count === max) {
        primaryDoshas.push(dosha);
      }
    }
    
    const primary = primaryDoshas.join('-');
    setResult({ primary, breakdown: counts });
  };

  const doshaDescriptions = {
    'Vata': 'You are dominated by Air and Space. You are creative, energetic, and adaptable, but prone to anxiety, dry skin, and irregular digestion when out of balance. Focus on warm, grounding foods and routine.',
    'Pitta': 'You are dominated by Fire and Water. You are intelligent, driven, and natural leaders, but prone to inflammation, acidity, and irritability when out of balance. Focus on cooling foods and stress management.',
    'Kapha': 'You are dominated by Earth and Water. You are calm, loving, and possess great stamina, but prone to lethargy, weight gain, and congestion when out of balance. Focus on light, stimulating foods and vigorous exercise.',
    'Vata-Pitta': 'You have a dual dosha nature of Air, Space, Fire, and Water. You are creative and driven, but must balance between not burning out and staying grounded.',
    'Pitta-Kapha': 'You have a dual dosha nature of Fire, Water, and Earth. You possess both intensity and endurance. Keep cool and avoid becoming too sedentary.',
    'Vata-Kapha': 'You have a dual dosha nature of Air, Space, Earth, and Water. You are adaptable yet stable, but need to be careful of irregular digestion and lethargy.',
    'Vata-Pitta-Kapha': 'You are Tridoshic! Your constitution is relatively balanced among all elements. Maintain harmony through a balanced lifestyle adapted to the seasons.'
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <section className="py-20 bg-dawn min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <Reveal>
            <span className="text-saffron text-xs uppercase tracking-[0.3em] font-medium block mb-3">Discover Your Nature</span>
          </Reveal>
          <SplitHeading className="font-serif text-4xl md:text-5xl mt-3 mb-4 text-forest">Prakriti Assessment</SplitHeading>
          <Reveal delay={0.2}>
            <p className="text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto">Take this simple traditional quiz to discover your unique mind-body constitution and receive personalized lifestyle guidance.</p>
          </Reveal>
        </div>

        {!result ? (
          <Reveal delay={0.3}>
            <div className="glass rounded-3xl p-8 md:p-12 shadow-organic">
              {questions.map((q, idx) => (
                <div key={q.id} className="mb-10 last:mb-0">
                  <h4 className="font-serif text-2xl text-forest mb-4">{idx + 1}. {q.question}</h4>
                  <div className="flex flex-col gap-3">
                    {q.options.map((opt, i) => (
                      <label key={i} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${answers[q.id] === opt.dosha ? 'bg-forest/10 border-forest text-forest' : 'bg-dawn/50 border-saffron/20 hover:border-saffron/40 text-ink/80'}`}>
                        <input 
                          type="radio" 
                          name={q.id} 
                          value={opt.dosha} 
                          checked={answers[q.id] === opt.dosha}
                          onChange={() => handleSelect(q.id, opt.dosha)}
                          className="w-5 h-5 accent-saffron"
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
                  disabled={!allAnswered}
                  className={!allAnswered ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Analyze My Prakriti
                </LeafButton>
                {!allAnswered && (
                  <p className="text-saffron text-xs mt-3">Please answer all questions to see your result.</p>
                )}
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="bg-forest rounded-3xl p-10 md:p-16 text-center shadow-lg border border-saffron/20">
              <span className="text-saffron text-xs uppercase tracking-[0.3em] font-medium">Your Primary Dosha Is</span>
              <h3 className="font-serif text-5xl md:text-6xl text-dawn mt-4 mb-8">{result.primary}</h3>
              <p className="text-dawn/80 leading-relaxed text-lg max-w-2xl mx-auto mb-10">
                {doshaDescriptions[result.primary] || 'A unique blend of doshas shapes your constitution.'}
              </p>
              
              <div className="flex justify-center gap-8 mb-12 border-y border-saffron/20 py-6 max-w-lg mx-auto">
                <div className="text-dawn"><span className="block text-2xl font-serif text-saffron">{result.breakdown.Vata}</span> Vata</div>
                <div className="text-dawn"><span className="block text-2xl font-serif text-saffron">{result.breakdown.Pitta}</span> Pitta</div>
                <div className="text-dawn"><span className="block text-2xl font-serif text-saffron">{result.breakdown.Kapha}</span> Kapha</div>
              </div>

              <LeafButton onClick={() => {setResult(null); setAnswers({});}} variant="outline" className="border-saffron text-saffron hover:bg-saffron/10">
                Retake Assessment
              </LeafButton>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
