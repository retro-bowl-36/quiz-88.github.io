import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useRef, useEffect } from "react";
import { games, featuredGames } from "@/mocks/games";

export default function GamePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restartKey, setRestartKey] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const game = useMemo(() => {
    const numericId = Number(id);
    const allGames = [...games, ...featuredGames];
    return allGames.find((g) => g.id === numericId);
  }, [id]);

  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) {
        setShowOverlay(false);
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const enterFullscreen = () => {
    setShowOverlay(true);
    setTimeout(() => {
      overlayRef.current?.requestFullscreen().catch(() => {
        // fallback: show overlay without native fullscreen
      });
    }, 50);
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setShowOverlay(false);
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-black text-white mb-4">Game Not Found</h1>
          <p className="text-white/50 mb-6">This game does not exist.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Fullscreen Overlay */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <iframe
            key={`overlay-${restartKey}`}
            title={game.name}
            src={game.url}
            className="w-full h-full border-none"
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
          />
          <button
            onClick={exitFullscreen}
            className="absolute top-4 right-4 z-[10000] flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium px-4 py-2 rounded-full border border-white/20 transition-all cursor-pointer text-sm"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-close-line" />
            </div>
            Exit Fullscreen
          </button>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-left-line" />
            </div>
            <span className="font-semibold text-sm">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center bg-emerald-500 rounded-lg">
              <i className="ri-gamepad-line text-black text-sm" />
            </div>
            <span className="text-white font-bold text-lg">retro-bowl-36.github.io</span>
          </div>
          <div className="w-20" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Game Info Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                {game.category}
              </span>
              <span className="text-white/50 text-xs">{game.subCategory}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">{game.name}</h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-2xl">{game.description}</p>
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-user-line" />
                </div>
                <span>{game.players} players</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-code-s-slash-line" />
                </div>
                <span>{game.tech}</span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <button
              onClick={() => setRestartKey((k) => k + 1)}
              className="whitespace-nowrap flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-full border border-white/20 transition-all cursor-pointer text-sm"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-refresh-line" />
              </div>
              Restart
            </button>
            <button
              onClick={enterFullscreen}
              className="whitespace-nowrap flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2.5 rounded-full transition-all cursor-pointer text-sm"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-fullscreen-line" />
              </div>
              Fullscreen
            </button>
          </div>
        </div>

        {/* Game Player */}
        <div
          className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black"
          style={{ aspectRatio: "16/9" }}
        >
          <iframe
            key={restartKey}
            id="game-frame"
            title={game.name}
            src={game.url}
            className="w-full h-full"
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
          />
        </div>
      </div>
    </div>
  );
}