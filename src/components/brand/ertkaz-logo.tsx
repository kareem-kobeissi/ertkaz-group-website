import Image from "next/image";

type ErtkazLogoProps = {
  className?: string;
  priority?: boolean;
};

export function ErtkazLogo({ className, priority = false }: ErtkazLogoProps) {
  return (
    <Image
      className={["brand-logo", className].filter(Boolean).join(" ")}
      src="/ertkaz-group-corporate-logo.png"
      width={1817}
      height={866}
      alt=""
      aria-hidden="true"
      priority={priority}
      unoptimized
      draggable={false}
    />
  );
}
