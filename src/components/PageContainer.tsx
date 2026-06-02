import { type HTMLAttributes, type ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  /** Applied to the inner max-width container, not the outer dot-pattern wrapper. */
  innerClassName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

export default function PageContainer({
  children,
  innerClassName,
  ...props
}: PageContainerProps) {
  return (
    <div className="dot-pattern" {...props}>
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 py-20 ${innerClassName ?? ""}`}
      >
        {children}
      </div>
    </div>
  );
}
