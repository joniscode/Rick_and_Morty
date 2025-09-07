import HeartOutline from "../../assets/icons/Heart.png";
import HeartGreen from "../../assets/icons/HeartGreen.png";

export default function IconHeart({ filled = false }: { filled?: boolean }) {
  return (
    <img
      src={filled ? HeartGreen : HeartOutline}
      alt={filled ? "Favorito" : "No favorito"}
      className="h-5 w-5"
    />
  );
}