import type { ProjectVisual } from "@/data/projects";

type ProjectArtworkProps = {
  variant: ProjectVisual;
};

export function ProjectArtwork({ variant }: ProjectArtworkProps) {
  if (variant === "link") {
    return (
      <svg viewBox="0 0 700 900" role="presentation">
        <g className="project-artwork__fine">
          <path d="M-40 145H740M-40 450H740M-40 755H740" />
          <path d="M95-40v980M350-40v980M605-40v980" />
        </g>
        <path className="project-artwork__outline" d="m350 72 205 118v237L350 545 145 427V190Z" />
        <path className="project-artwork__outline project-artwork__outline--accent" d="m350 355 205 118v237L350 828 145 710V473Z" />
        <path className="project-artwork__solid" d="m350 223 74 43v85l-74 43-74-43v-85Z" />
        <path className="project-artwork__solid project-artwork__solid--cyan" d="m350 506 74 43v85l-74 43-74-43v-85Z" />
        <path className="project-artwork__connector" d="M350 394v112" />
      </svg>
    );
  }

  if (variant === "field") {
    return (
      <svg viewBox="0 0 800 800" role="presentation">
        <g className="project-artwork__field">
          <path d="m400 78 112 65v129l-112 65-112-65V143Z" />
          <path d="m210 188 112 65v129l-112 65-112-65V253Z" />
          <path d="m590 188 112 65v129l-112 65-112-65V253Z" />
          <path d="m400 408 112 65v129l-112 65-112-65V473Z" />
          <path d="m210 518 112 65v129l-112 65-112-65V583Z" />
          <path d="m590 518 112 65v129l-112 65-112-65V583Z" />
        </g>
        <path className="project-artwork__axis" d="M400 78v589M98 253l604 349M702 253 98 602" />
        <path className="project-artwork__solid project-artwork__solid--navy" d="m400 264 68 39v78l-68 39-68-39v-78Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1200 700" role="presentation">
      <g className="project-artwork__fine">
        <path d="M0 116h1200M0 350h1200M0 584h1200" />
        <path d="M200 0v700M600 0v700M1000 0v700" />
      </g>
      <path className="project-artwork__outline" d="m600 62 250 144v288L600 638 350 494V206Z" />
      <path className="project-artwork__outline project-artwork__outline--accent" d="m600 146 177 102v204L600 554 423 452V248Z" />
      <path className="project-artwork__solid" d="m600 249 88 51v101l-88 51-88-51V300Z" />
      <path className="project-artwork__axis" d="M600 62v187M850 206 688 300M850 494 688 401M600 638V452M350 494l162-93M350 206l162 94" />
      <circle className="project-artwork__point" cx="600" cy="350" r="8" />
    </svg>
  );
}
