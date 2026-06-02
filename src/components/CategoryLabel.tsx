type CategoryLabelProps = {
  label: string;
};

export default function CategoryLabel({ label }: CategoryLabelProps) {
  return (
    <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
      {label}
    </h3>
  );
}
