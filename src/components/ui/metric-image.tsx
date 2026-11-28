import Image from "next/image";
import { AnimatedCount } from "@/components/ui/animated-count";
import type { DirectoryMetric, EditorialImage } from "@/data/editorial-visuals";
import styles from "./metric-image.module.css";

export function MetricImage({ image, metric, className = "", priority = false }: { image: EditorialImage; metric?: DirectoryMetric; className?: string; priority?: boolean }) {
  return <figure className={`${styles.figure} ${className}`} data-editorial-photo data-metric-photo={metric ? true : undefined}>
    <picture>
      {image.mobile ? <source media="(max-width: 767px)" srcSet={image.mobile} type="image/webp" /> : null}
      <Image src={image.src} alt="" fill unoptimized priority={priority} sizes="(max-width: 767px) 100vw, 50vw" style={{ objectPosition: image.position }} />
    </picture>
    {metric ? <figcaption><AnimatedCount {...metric} /></figcaption> : null}
  </figure>;
}
