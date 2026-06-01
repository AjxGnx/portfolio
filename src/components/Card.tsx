import { type HTMLAttributes, type ReactNode } from "react";

type CardProps = {
  media?: ReactNode;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

type CardSectionProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

function mergeClassName(...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export default function Card({ media, children, className, ...props }: CardProps) {
  return (
    <div
      className={mergeClassName(
        "group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-accent/20 hover:glow transition-all h-full flex flex-col",
        className
      )}
      {...props}
    >
      {media}
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: CardSectionProps) {
  return (
    <div className={mergeClassName("p-5 flex flex-col flex-1", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: CardSectionProps) {
  return (
    <div
      className={mergeClassName("flex items-center gap-3 pt-3 border-t border-border/50", className)}
      {...props}
    >
      {children}
    </div>
  );
}
