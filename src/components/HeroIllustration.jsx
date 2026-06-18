const HeroIllustration = () => (
  <svg viewBox="0 0 560 420" role="img" aria-label="Donation illustration">
    <defs>
      <linearGradient id="heroDrop" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="100%" stopColor="#FF8C72" />
      </linearGradient>
      <linearGradient id="heroCard" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FFF2F2" />
      </linearGradient>
    </defs>
    <rect x="58" y="64" width="444" height="280" rx="34" fill="url(#heroCard)" stroke="rgba(255,107,107,0.18)" />
    <circle cx="445" cy="108" r="28" fill="rgba(76,175,80,0.12)" />
    <circle cx="122" cy="104" r="22" fill="rgba(255,107,107,0.12)" />
    <path d="M278 92C235 154 174 200 174 273C174 331 221 378 278 378C335 378 382 331 382 273C382 200 321 154 278 92Z" fill="url(#heroDrop)" />
    <path d="M279 211C252 211 230 233 230 260C230 287 252 309 279 309C306 309 328 287 328 260C328 233 306 211 279 211ZM303 267H286V284H272V267H255V253H272V236H286V253H303V267Z" fill="#FFFFFF" />
    <path d="M140 271C121 271 106 286 106 305V329H174V305C174 286 159 271 140 271Z" fill="#F8B6B6" />
    <circle cx="140" cy="248" r="24" fill="#FFD9D9" />
    <path d="M417 271C398 271 383 286 383 305V329H451V305C451 286 436 271 417 271Z" fill="#C1E7C3" />
    <circle cx="417" cy="248" r="24" fill="#E5F7E7" />
    <path d="M103 332H456" stroke="rgba(15,23,42,0.08)" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export default HeroIllustration;
