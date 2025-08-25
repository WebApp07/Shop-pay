import { BsSuitHeart } from "react-icons/bs";
import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Top() {
  const [loggdIn, setLoggedIn] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg"
              alt=""
            />
            <span>Morocco / Usd</span>
          </li>

          <li>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li>
            <span>Help</span>
          </li>
          <li>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>whishlist</span>
            </Link>
          </li>
          <li>
            {loggdIn ? (
              <li>
                <div className={styles.flex}>
                  <img
                    src="https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                    alt=""
                  />
                  <span>Amine</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            <UserMenu loggdIn={loggdIn} />
          </li>
        </ul>
      </div>
    </div>
  );
}
