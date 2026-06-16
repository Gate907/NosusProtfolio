export function Blobs({ variant = "hero" }: { variant?: "hero" | "soft" | "cta" }) {
  if (variant === "cta") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/30 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#ffd166]/40 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
      </div>
    );
  }
  if (variant === "soft") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#ffd166]/30 blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[#06d6a0]/20 blur-3xl animate-blob" style={{ animationDelay: "-9s" }} />
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] h-[480px] w-[480px] rounded-full bg-[#ff7a00]/25 blur-3xl animate-blob" />
      <div className="absolute top-[10%] right-[-8%] h-[520px] w-[520px] rounded-full bg-[#ffd166]/40 blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
      <div className="absolute bottom-[-15%] left-[20%] h-[460px] w-[460px] rounded-full bg-[#06d6a0]/25 blur-3xl animate-blob" style={{ animationDelay: "-9s" }} />
      <div className="absolute bottom-[5%] right-[15%] h-[360px] w-[360px] rounded-full bg-[#118ab2]/20 blur-3xl animate-blob" style={{ animationDelay: "-13s" }} />
      <div className="absolute inset-0 grid-pattern opacity-60" />
    </div>
  );
}
