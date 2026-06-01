import { type HTMLAttributes, type ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

export default function PageContainer({
  children,
  className,
  ...props
}: PageContainerProps) {
  return (
    <div className="dot-pattern" {...props}>
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 py-20 ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
