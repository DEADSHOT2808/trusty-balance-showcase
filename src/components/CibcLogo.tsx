export function CibcLogo({ className = "h-10" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 font-bold ${className}`} style={{ color: "var(--cibc-red)" }}>
      <span className="text-3xl tracking-tight">CIBC</span>
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
      </svg>
    </div>
  );
}