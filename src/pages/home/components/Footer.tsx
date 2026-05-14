export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-10 mt-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center bg-emerald-500 rounded-lg">
              <i className="ri-gamepad-fill text-black" />
            </div>
            <span className="text-white font-black text-lg">Quiz 88</span>
          </div>
          <p className="text-white/30 text-sm text-center">
            Quiz 88
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-white/20 text-xs">Action</span>
            <span className="text-white/20 text-xs">Strategy</span>
            <span className="text-white/20 text-xs">Casual</span>
            <span className="text-white/20 text-xs">Sports</span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs">
            © 2026 Quiz 88 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}