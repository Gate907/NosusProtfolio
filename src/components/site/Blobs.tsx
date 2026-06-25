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
      <div className="absolute top-[-10%] left-[-5%] h-[clamp(320px,35vw,560px)] w-[clamp(320px,35vw,560px)] rounded-full bg-[#ff7a00]/25 blur-3xl animate-blob" />
      <div className="absolute top-[10%] right-[-8%] h-[clamp(340px,38vw,600px)] w-[clamp(340px,38vw,600px)] rounded-full bg-[#ffd166]/40 blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
      <div className="absolute bottom-[-15%] left-[20%] h-[clamp(300px,32vw,520px)] w-[clamp(300px,32vw,520px)] rounded-full bg-[#06d6a0]/25 blur-3xl animate-blob" style={{ animationDelay: "-9s" }} />
      <div className="absolute bottom-[5%] right-[15%] h-[clamp(240px,28vw,460px)] w-[clamp(240px,28vw,460px)] rounded-full bg-[#118ab2]/20 blur-3xl animate-blob" style={{ animationDelay: "-13s" }} />
      <div className="absolute inset-0 grid-pattern opacity-60" />
    </div>
  );
}
