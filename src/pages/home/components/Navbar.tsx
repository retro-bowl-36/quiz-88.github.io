import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<null | { email?: string }>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser(data.session.user);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 flex items-center justify-center bg-emerald-500 rounded-lg">
            <i className="ri-gamepad-fill text-black text-lg" />
          </div>
          <span className="text-white font-black text-xl tracking-tight">
            Quiz 88
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Home
          </a>
          <a
            href="/#games"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Games
          </a>
          <span className="text-white/60 text-sm font-medium">
            Quiz 88
          </span>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full">
                <div className="w-5 h-5 flex items-center justify-center bg-emerald-500 rounded-full">
                  <i className="ri-user-fill text-black text-[10px]" />
                </div>
                {user.email?.split("@")[0] ?? "Kullanici"}
              </div>
              <button
                onClick={handleLogout}
                className="text-white/40 hover:text-white text-xs font-medium transition-colors px-2 py-1"
              >
                Cikis
              </button>
            </div>
          ) : null}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center text-white/60 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="ri-menu-line text-xl" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/5 px-4 py-4 space-y-3">
          <a
            href="/"
            className="block text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            Home
          </a>
          <a
            href="/#games"
            className="block text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            Games
          </a>
          <span className="block text-white/60 text-sm font-medium">
            Quiz 88
          </span>
          {user ? (
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full">
                <div className="w-5 h-5 flex items-center justify-center bg-emerald-500 rounded-full">
                  <i className="ri-user-fill text-black text-[10px]" />
                </div>
                {user.email?.split("@")[0] ?? "Kullanici"}
              </div>
              <button
                onClick={handleLogout}
                className="text-white/40 hover:text-white text-xs font-medium transition-colors px-2 py-1"
              >
                Cikis
              </button>
            </div>
          ) : null}
        </div>
      )}
    </nav>
  );
}