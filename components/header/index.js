import Ad from "./Ad";
import styles from "./styles.module.scss";
import Top from "./Top";
import Main from "./Main";

export default function Header({ country, currency }) {
  return (
    <div className={styles.header}>
      <Ad />
      <Top country={country} currency={currency} />
      <Main />
    </div>
  );
}
