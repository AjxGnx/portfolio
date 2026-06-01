import AnimatedSection from "@/components/AnimatedSection";

type FilterOption = {
  value: string;
  label: string;
};

type FilterBarProps = {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function FilterBar({
  options,
  value,
  onChange,
  className,
}: FilterBarProps) {
  return (
    <AnimatedSection className={`flex flex-wrap items-center gap-2 mb-8 ${className ?? ""}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            value === option.value
              ? "bg-accent text-white"
              : "bg-card text-muted border border-border/50 hover:text-foreground hover:border-accent/30"
          }`}
        >
          {option.label}
        </button>
      ))}
    </AnimatedSection>
  );
}
