import SkillBar from "@/components/SkillBar";

type SkillCardProps = {
  name: string;
  level: number;
};

export default function SkillCard({ name, level }: SkillCardProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 hover:bg-card-hover transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted">{level}%</span>
      </div>
      <SkillBar level={level} />
    </div>
  );
}
