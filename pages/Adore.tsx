import React from 'react';
import { Quote, Sparkles } from 'lucide-react';

const QUOTES = [
  {
    id: 1,
    text: "The Eucharistic Heart is the refuge of souls. Hide yourself therein.",
    author: "St. Margaret Mary Alacoque",
    color: "bg-red-50 dark:bg-red-900/20"
  },
  {
    id: 2,
    text: "When you look at the Crucifix, you understand how much Jesus loved you then. When you look at the Sacred Host, you understand how much Jesus loves you now.",
    author: "Blessed Carlo Acutis",
    color: "bg-amber-50 dark:bg-amber-900/20"
  },
  {
    id: 3,
    text: "Do you realize that Jesus is there in the tabernacle expressly for you - for you alone? He burns with the desire to come into your heart.",
    author: "St. Thérèse of Lisieux",
    color: "bg-rose-50 dark:bg-rose-900/20"
  },
  {
    id: 4,
    text: "The Eucharist is the Heart of the Church. Where Eucharistic life flourishes, there the life of the Church will blossom.",
    author: "St. John Paul II",
    color: "bg-stone-50 dark:bg-stone-800"
  },
  {
    id: 5,
    text: "Put your sins in the chalice for the precious blood to wash away. One drop is capable of saving the world.",
    author: "Mother Teresa",
    color: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    id: 6,
    text: "Receive Communion often, very often... there you have the sole remedy, if you want to be cured. Jesus has not put this attraction in your heart for nothing.",
    author: "St. Thérèse of Lisieux",
    color: "bg-yellow-50 dark:bg-yellow-900/20"
  }
];

const Adore: React.FC = () => {
  return (
    <div className="space-y-6 pb-8">
      <div className="text-center space-y-2">
        <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-full mb-2 border border-white/30">
          <Sparkles className="w-8 h-8 text-gold-accent" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-800 dark:text-stone-100">Adore</h2>
        <p className="text-stone-600 dark:text-stone-300 max-w-xs mx-auto text-sm leading-relaxed">
          "Could you not watch one hour with me?" <br/>
          <span className="text-xs italic text-stone-500">— Matthew 26:40</span>
        </p>
      </div>

      <div className="grid gap-4">
        {QUOTES.map((quote) => (
          <div 
            key={quote.id} 
            className={`
              relative p-6 rounded-xl border border-white/50 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300
              ${quote.color} backdrop-blur-sm
            `}
          >
            <Quote className="absolute top-4 left-4 w-6 h-6 text-sacred-red/20 rotate-180" />
            <div className="relative z-10 pt-4">
              <p className="font-serif text-lg text-stone-800 dark:text-stone-200 leading-relaxed mb-3">
                "{quote.text}"
              </p>
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-sacred-red/20" />
                <span className="text-xs font-bold text-sacred-red uppercase tracking-wider">
                  {quote.author}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center p-8 bg-white/80 dark:bg-stone-800/80 rounded-2xl shadow-sm border border-gold-accent/30">
        <h3 className="font-serif font-bold text-stone-800 dark:text-stone-100 mb-2">Act of Spiritual Communion</h3>
        <p className="text-sm text-stone-600 dark:text-stone-300 italic leading-relaxed">
          "My Jesus, I believe that You are present in the Most Holy Sacrament. 
          I love You above all things, and I desire to receive You into my soul. 
          Since I cannot at this moment receive You sacramentally, come at least spiritually into my heart. 
          I embrace You as if You were already there and unite myself wholly to You. 
          Never permit me to be separated from You. Amen."
        </p>
      </div>
    </div>
  );
};

export default Adore;