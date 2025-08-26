import Ad from "./Ad";
import styles from "./styles.module.scss";
import Top from "./Top";
import Main from "./Main";
import Footer from "../footer";

export default function Header() {
  return (
    <div className={styles.header}>
      <Ad />
      <Top />
      <Main />
      <Footer />
    </div>
  );
}
