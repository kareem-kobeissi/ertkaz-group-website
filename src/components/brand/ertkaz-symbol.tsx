type ErtkazSymbolProps = {
  className?: string;
};

export function ErtkazSymbol({ className }: ErtkazSymbolProps) {
  return (
    <svg
      className={["ertkaz-symbol", className].filter(Boolean).join(" ")}
      viewBox="0 0 240 240"
      role="presentation"
      aria-hidden="true"
    >
      <g className="ertkaz-symbol__orbit" data-brand-orbit>
        <circle cx="120" cy="120" r="104" />
        <circle cx="120" cy="120" r="82" />
      </g>
      <g className="ertkaz-symbol__rotor" data-brand-rotor>
        <path data-brand-segment className="ertkaz-symbol__segment ertkaz-symbol__segment--1" d="M120 24 184 61" />
        <path data-brand-segment className="ertkaz-symbol__segment ertkaz-symbol__segment--2" d="M197 78v74" />
        <path data-brand-segment className="ertkaz-symbol__segment ertkaz-symbol__segment--3" d="m184 179-64 37" />
        <path data-brand-segment className="ertkaz-symbol__segment ertkaz-symbol__segment--4" d="m107 216-64-37" />
        <path data-brand-segment className="ertkaz-symbol__segment ertkaz-symbol__segment--5" d="M30 152V78" />
        <path data-brand-segment className="ertkaz-symbol__segment ertkaz-symbol__segment--6" d="m43 61 64-37" />
      </g>
      <path className="ertkaz-symbol__inner" data-brand-inner d="m120 77 37 21v44l-37 21-37-21V98Z" />
      <circle className="ertkaz-symbol__core" data-brand-core cx="120" cy="120" r="5" />
      <g className="ertkaz-symbol__nodes" data-brand-nodes>
        <circle cx="120" cy="24" r="3" />
        <circle cx="197" cy="78" r="3" />
        <circle cx="184" cy="179" r="3" />
        <circle cx="107" cy="216" r="3" />
        <circle cx="30" cy="152" r="3" />
        <circle cx="43" cy="61" r="3" />
      </g>
    </svg>
  );
}
