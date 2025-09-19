/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { BsArrowUpCircle } from "react-icons/bs";
import styles from "../category/styles.module.scss";

export default function Category({ header, products, background }) {
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowUpCircle />
      </div>
      <div className={styles.category__products}>
        {products.map((product) => {
          return (
            <div className={styles.product}>
              <img key={product.image} src={product.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
