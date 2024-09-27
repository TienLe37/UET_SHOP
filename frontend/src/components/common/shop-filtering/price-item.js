import { useRouter } from "next/router";
import formatPrice from "@utils/formatPrice";

const PriceItem = ({ id, min, max }) => {
  const router = useRouter();

  // handlePrice
  const handlePrice = (min, max) => {
    if (min) {
      router.push(`/shop?priceMin=${min}&max=${max}`);
    } else {
      router.push(`/shop?priceMax=${max}`);
    }
  };
  return (
    <div className="shop__widget-list-item">
      <input
        onChange={() => handlePrice(min, max)}
        type="checkbox"
        id={`higher-${id}`}
        checked={
          router.query.priceMin === `${min}` ||
            router.query.priceMax === `${max}`
            ? "checked"
            : false
        }
      />
      {max < 10000000 ? (
        <label htmlFor={`higher-${id}`}>
          {formatPrice(min)} - {formatPrice(max)}
        </label>
      ) : (
        <label htmlFor={`higher-${id}`}>
          {formatPrice(max)} +
        </label>
      )}
    </div>
  );
};

export default PriceItem;
