interface SkillBarProps {
  level: number;
  delay?: number;
}

export default function SkillBar({ level }: SkillBarProps) {
  return (
    <div className="h-1.5 rounded-full bg-border overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
        style={{ width: `${level}%` }}
      />
    </div>
  );
}
