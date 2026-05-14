import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { featuredGames } from "@/mocks/games";

export default function HeroCarousel() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % featuredGames.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const game = featuredGames[current];

  return (
    <section className="relative w-full h-[520px] md:h-[620px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt={game.name}
          className="w-full h-full object-cover object-top transition-opacity duration-700"
          src={game.image}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Featured
              </span>
              <span className="text-white/50 text-sm">{game.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              {game.name}
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
              {game.description}
            </p>
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-user-line" />
                </div>
                <span>{game.players} players</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-calendar-line" />
                </div>
                <span>{game.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-code-s-slash-line" />
                </div>
                <span>{game.tech}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => navigate(`/quiz/${game.id}`)}
                className="whitespace-nowrap flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-play-fill" />
                </div>
                Play Now
              </button>
              <a
                href="#games"
                className="whitespace-nowrap flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-full border border-white/20 transition-all duration-200 cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-information-line" />
                </div>
                Browse Games
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {featuredGames.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === current ? "w-8 h-2 bg-emerald-500" : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}