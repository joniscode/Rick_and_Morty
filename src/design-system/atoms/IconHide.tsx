type Props = {
  title?: string;
  className?: string;
};

export default function IconHide({ title, className }: Props) {
  const labelled = Boolean(title);
  return (
    <svg
      role={labelled ? "img" : "presentation"}
      aria-label={labelled ? title : undefined}
      className={className}
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      {title ? <title>{title}</title> : null}
      {/* tu path original */}
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zm10-4a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}
