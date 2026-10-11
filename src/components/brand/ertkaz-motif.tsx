export function ErtkazMotif() {
  return (
    <div className="ertkaz-motif" aria-hidden="true" data-hero-reveal>
      <svg viewBox="0 0 180 180" role="presentation">
        <g className="ertkaz-motif__rotor" data-motif-rotor>
          <path data-motif-segment className="motif-segment motif-segment--1" d="M90 18 145 50" />
          <path data-motif-segment className="motif-segment motif-segment--2" d="M151 59v62" />
          <path data-motif-segment className="motif-segment motif-segment--3" d="m145 130-55 32" />
          <path data-motif-segment className="motif-segment motif-segment--4" d="m80 162-55-32" />
          <path data-motif-segment className="motif-segment motif-segment--5" d="M19 121V59" />
          <path data-motif-segment className="motif-segment motif-segment--6" d="m25 50 55-32" />
        </g>
        <path className="ertkaz-motif__inner" d="m90 49 35 20v42l-35 20-35-20V69Z" />
        <circle className="ertkaz-motif__point" cx="90" cy="90" r="3" />
      </svg>
      <div className="ertkaz-motif__caption">
        <span>Perspective</span>
        <span>Direction</span>
      </div>
    </div>
  );
}
