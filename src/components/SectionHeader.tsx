import AnimatedSection from "./AnimatedSection";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <AnimatedSection className="mb-12 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
        <span className="gradient-text">{title}</span>
      </h1>
      {subtitle && (
        <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
