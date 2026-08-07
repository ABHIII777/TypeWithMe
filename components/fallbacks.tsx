export function ResultsFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-16 px-4 animate-pulse">
      <div className="w-36 h-36 bg-black/10 border-2 border-black flex items-center justify-center -rotate-2">
        <span className="font-mono text-7xl font-bold text-black/30">?</span>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-md w-full">
        <div className="bg-white border-2 border-black brutal-shadow px-6 py-4 text-center h-24" />
        <div className="bg-white border-2 border-black brutal-shadow px-6 py-4 text-center h-24" />
        <div className="bg-white border-2 border-black brutal-shadow px-6 py-4 text-center h-24" />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-black/60">
        crunching numbers...
      </span>
    </div>
  );
}

export function ModalFallback() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-[3px] border-black shadow-[8px_8px_0_0_#000] max-w-md w-full h-72 animate-pulse flex items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-widest text-black/60">
          loading...
        </span>
      </div>
    </div>
  );
}

export function SamplesFallback() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full animate-pulse">
      <div className="bg-white border-2 border-black brutal-shadow p-6 h-48" />
      <div className="bg-white border-2 border-black brutal-shadow p-6 h-48" />
    </section>
  );
}