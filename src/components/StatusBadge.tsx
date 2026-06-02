import { type LucideIcon } from "lucide-react";

type StatusBadgeProps = {
  icon: LucideIcon;
  label: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  className?: string;
};

export default function StatusBadge({
  icon: Icon,
  label,
  colorClass,
  bgClass,
  borderClass,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${bgClass} border ${borderClass} px-2 py-0.5 text-xs font-medium ${colorClass} ${className ?? ""}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
