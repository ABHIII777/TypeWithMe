export default function TestLoading() {
  return (
    <div className="min-h-screen bg-brutal-grid flex flex-col items-center justify-center gap-6">
      <div className="w-9 h-9 bg-black flex items-center justify-center shadow-[3px_3px_0_0_#fff] animate-pulse">
        <span className="text-yellow-300 font-bold text-xl leading-none">T</span>
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-black/70 animate-pulse">
        preparing word pool...
      </p>
      <div className="flex gap-6 text-center">
        <div className="bg-white px-6 py-3 border-2 border-black brutal-shadow animate-pulse h-20 w-24" />
        <div className="bg-white px-6 py-3 border-2 border-black brutal-shadow animate-pulse h-20 w-24" />
        <div className="bg-white px-6 py-3 border-2 border-black brutal-shadow animate-pulse h-20 w-24" />
      </div>
      <div className="w-full max-w-3xl border-2 border-black brutal-shadow bg-white px-6 py-8 animate-pulse h-36" />
    </div>
  );
}