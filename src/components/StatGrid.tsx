import AnimatedSection from "@/components/AnimatedSection";

type Stat = {
  value: number;
  label: string;
  colorClass?: string;
};

type StatGridProps = {
  stats: Stat[];
  className?: string;
};

export default function StatGrid({ stats, className }: StatGridProps) {
  return (
    <AnimatedSection className={`grid grid-cols-3 gap-3 mb-8 ${className ?? ""}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="glass rounded-xl p-4 text-center">
          <p
            className={`text-2xl font-bold ${stat.colorClass ?? "text-foreground"}`}
          >
            {stat.value}
          </p>
          <p className="text-xs text-muted mt-1">{stat.label}</p>
        </div>
      ))}
    </AnimatedSection>
  );
}
