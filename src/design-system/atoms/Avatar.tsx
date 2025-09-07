type Props = { src: string; alt: string; size?: "sm" | "md" | "lg"; className?: string };
const sizeMap = { sm: "h-10 w-10", md: "h-14 w-14", lg: "h-20 w-20" };

export default function Avatar({ src, alt, size = "sm", className = "" }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${sizeMap[size]} rounded-full object-cover border border-gray-200 ${className}`}
    />
  );
}
