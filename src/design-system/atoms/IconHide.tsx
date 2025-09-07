export default function IconHide({ className = "", title = "Ocultar" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className={`h-5 w-5 stroke-slate-500 ${className}`}>
      <title>{title}</title>
      <path d="M3 3l18 18" strokeWidth="2" />
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" fill="none" strokeWidth="2" />
    </svg>
  );
}
