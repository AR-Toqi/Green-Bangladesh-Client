export function Footer() {
  return (
    <footer className="px-6 border-t border-zinc-800 py-12 bg-black">
      <div className="container mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-center text-sm leading-loose text-zinc-500 md:text-left font-medium">
          Built for a greener Bangladesh. © 2026
        </p>
        <p className="text-center text-xs tracking-widest uppercase font-bold text-zinc-600 md:text-right">
          Developed by{" "}
          <a 
            href="https://www.linkedin.com/in/abdullah-ragib-toqi-b5154a297/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-500 transition-colors underline underline-offset-4"
          >
            Abdullah Ragib Toqi
          </a>
        </p>
      </div>
    </footer>
  );
}
