import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { games, categories } from "@/mocks/games";

export default function GamesSection() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedGames = useMemo(() => {
    const classics = games.filter((g) => g.url.includes("quiz-50.github.io"));
    const ioGames = games.filter((g) => !g.url.includes("quiz-50.github.io"));
    return [...classics, ...ioGames];
  }, []);

  const filteredGames = useMemo(() => {
    let result = sortedGames;
    if (activeCategory !== "all") {
      result = result.filter((g) => g.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.subCategory.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery, sortedGames]);

  const visibleGames = filteredGames;

  return (
    <div id="games" className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white">
            Quiz 88
          </h2>
          <p className="text-white/40 text-sm mt-1">Quiz 88</p>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-white/40">
            <i className="ri-search-line text-sm" />
          </div>
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm rounded-full pl-9 pr-4 py-2.5 w-full md:w-64 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-emerald-500 text-black"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {visibleGames.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/quiz/${game.id}`)}
            className="group cursor-pointer bg-[#111111] rounded-xl overflow-hidden border border-white/5 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative overflow-hidden aspect-video">
              <img
                alt={game.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={game.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {game.featured && (
                <div className="absolute top-2 left-2 bg-emerald-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  FEATURED
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                  {game.category}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-500 rounded-full">
                  <i className="ri-play-fill text-black text-xl" />
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                {game.name}
              </h3>
              <p className="text-white/40 text-xs mb-2 line-clamp-1">{game.subCategory}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-white/40 text-xs">
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-user-line text-xs" />
                  </div>
                  <span>{game.players}</span>
                </div>
                <div className="flex items-center gap-1 text-white/40 text-xs">
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-code-line text-xs" />
                  </div>
                  <span className="truncate max-w-[80px]">{game.tech}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}