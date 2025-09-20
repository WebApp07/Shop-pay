/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { BsArrowUpCircle } from "react-icons/bs";
import styles from "../category/styles.module.scss";
import { useMediaQuery } from "react-responsive";

export default function Category({ header, products, background }) {
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  //console.log(isMedium);
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowUpCircle />
      </div>
      <div className={styles.category__products}>
        {products.slice(0, isMobile ? 6 : isMedium ? 4 : 6).map((product) => {
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
