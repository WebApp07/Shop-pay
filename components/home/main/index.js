import styles from "./styles.module.scss"
export default function Main() {
  return (

    <div className={styles.main}>
        <div className={styles.header}>Header</div>
        <div className={styles.menu}>menu</div>
        <div className={styles.swiper}>swiper</div>
        <div className={styles.offres}>offres</div>
        <div className={styles.user}>user</div>
    </div>
  )
}
