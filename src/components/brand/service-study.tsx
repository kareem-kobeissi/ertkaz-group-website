import type { ServiceGroupKey } from "@/content/profile-content";

/** Original editorial brand diagrams, never illustrations of client results. */
export function ServiceStudy({ group, ordinal, label }: { group: ServiceGroupKey; ordinal: string; label: string }) {
  const index = Number(ordinal);
  return <div className={`service-study service-study--${group}`} aria-hidden="true">
    <span className="service-study__edition">ERTKAZ GROUP</span>
    <svg viewBox="0 0 600 450" role="presentation">
      <g className="service-study__grid"><path d="M0 112H600M0 225H600M0 338H600M150 0V450M300 0V450M450 0V450" /></g>
      {group === "transformation" ? <g transform={`rotate(${(index % 3 - 1) * 12} 300 225)`}><path d="M100 125H280V305H100ZM320 145H500V325H320Z" /><path d="M190 125V85H410V145M190 305V365H410V325" /><circle cx="300" cy="225" r="55" className="service-study__core" /></g> : null}
      {group === "finance" ? <g><path d="M110 345H490M145 345V230H215V345M265 345V165H335V345M385 345V105H455V345" /><path className="service-study__accent" d={`M110 195 210 ${180 + index * 2} 320 100 490 65`} /><circle cx="490" cy="65" r="6" className="service-study__core" /></g> : null}
      {group === "strategy" ? <g><circle cx="300" cy="225" r="145" /><circle cx="300" cy="225" r="95" /><path d="M300 48V402M123 225H477" /><path className="service-study__accent" d={`M155 345 250 270 300 225 ${410 + index} 120`} /><circle cx="300" cy="225" r="24" className="service-study__core" /></g> : null}
      {group === "technology" ? <g>{[0,1,2].flatMap(row => [0,1,2].map(col => <rect key={`${row}-${col}`} x={150 + col * 120} y={85 + row * 120} width="60" height="60" rx="3" className={row === index % 3 && col === 1 ? "service-study__core" : ""} />))}<path d="M210 115H270M330 115H390M210 235H270M330 235H390M210 355H270M330 355H390M180 145V205M300 145V205M420 145V205M180 265V325M300 265V325M420 265V325" /></g> : null}
    </svg>
    <span className="service-study__caption">{label}</span>
  </div>;
}
