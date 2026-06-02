type TechBadgeProps = {
  label: string;
  variant?: "pill" | "tag";
};

export default function TechBadge({ label, variant = "pill" }: TechBadgeProps) {
  const shape =
    variant === "pill"
      ? "rounded-full px-2.5 py-0.5"
      : "rounded-md px-2 py-0.5";

  return (
    <span
      className={`${shape} bg-accent/10 text-xs font-medium text-accent`}
    >
      {label}
    </span>
  );
}
