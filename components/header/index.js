import Ad from "./Ad";
import styles from "./styles.module.scss";
import Top from "./Top";

export default function Header() {
  return (
    <div className={styles.header}>
      <Ad />
      <Top />
    </div>
  );
}
