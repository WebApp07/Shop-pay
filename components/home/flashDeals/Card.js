/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";

export default function FlashCard({ product }) {
  const price = Number(product.price);
  const discount = Number(product.discount);
  const discountedPrice = (price - (price * discount) / 100).toFixed(2);

  return (
    <div className={styles.card}>
      {/* Product Image + Discount */}
      <div className={styles.card__img}>
        <Link href={product.link || "#"}>
          <img src={product.image} alt="Product" />
        </Link>
        <div className={styles.flash}>
          <MdFlashOn />
          <span>-{discount}%</span>
        </div>
      </div>

      {/* Prices */}
      <div className={styles.card__price}>
        <span>USD {discountedPrice}$</span>
        <span className={styles.oldPrice}>USD {price.toFixed(2)}$</span>
      </div>

      {/* Sold bar */}
      <div className={styles.card__bar}>
        <div
          className={styles.card__bar_inner}
          style={{ width: `${product.sold}%` }}
        ></div>
      </div>
      <div className={styles.card__percentage}>{product.sold}% Sold</div>
    </div>
  );
}
