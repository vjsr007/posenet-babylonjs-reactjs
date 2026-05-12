import { Icon } from "@/components/Icon";

interface StarsProps {
  count?: number;
  of?: number;
}

export function Stars({ count = 5, of = 5 }: StarsProps) {
  return (
    <span className="stars">
      {Array.from({ length: of }).map((_, i) => (
        <span key={i} className={i < count ? "" : "off"}>
          <Icon name="star" size={14} />
        </span>
      ))}
    </span>
  );
}
