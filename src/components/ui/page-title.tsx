import type { ComponentPropsWithRef } from "react";

import styles from "./page-title.module.css";

export function PageTitle({ className = "", ...props }: ComponentPropsWithRef<"h1">) {
  return <h1 {...props} data-page-title className={`${styles.title} ${className}`} />;
}
