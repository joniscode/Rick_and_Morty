type Props = {
  children: React.ReactNode;
  count?: number;
  className?: string;
};

export default function SectionTitle({ children, count, className = "" }: Props) {
  return (
    <h2 className={`text-lg font-semibold tracking-tight flex items-center gap-2 ${className}`}>
      <span>{children}</span>
      {typeof count === "number" && (
        <span className="text-xs rounded-full bg-gray-100 text-gray-600 px-2 py-0.5">{count}</span>
      )}
    </h2>
  );
}
