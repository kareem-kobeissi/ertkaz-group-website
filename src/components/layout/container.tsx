import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: ElementType;
};

export function Container({
  as,
  className = "",
  ...props
}: ContainerProps) {
  const Component: ElementType = as ?? "div";
  return <Component className={`container-site ${className}`} {...props} />;
}
