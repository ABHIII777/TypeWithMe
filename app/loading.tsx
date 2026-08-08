export default function RootLoading() {
  return (
    <div className="min-h-screen bg-brutal-grid flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 bg-black flex items-center justify-center shadow-[4px_4px_0_0_#ffd400] animate-pulse">
        <span className="text-yellow-300 font-bold text-2xl leading-none">T</span>
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-black/70 animate-pulse">
        loading typewithme...
      </p>
      <div className="w-48 h-3 bg-white border-2 border-black brutal-shadow overflow-hidden">
        <div className="h-full bg-yellow-300 animate-pulse w-2/3" />
      </div>
    </div>
  );
}