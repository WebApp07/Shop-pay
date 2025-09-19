import Link from "next/link";
import styles from "./styles.module.scss";
import { menuArray } from "../../../data/home";
import {
  GiLargeDress,
  GiClothes,
  Gi3DHammer,
  GiWatch,
  GiBallerinaShoes,
  GiHeadphones,
  GiHealthCapsule,
  GiSportMedal,
  GiBigDiamondRing,
} from "react-icons/gi";
import { MdOutlineSportsEsports, MdOutlineSmartToy } from "react-icons/md";
import { BiCameraMovie, BiGift, BiCategory } from "react-icons/bi";
import { FaBaby } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { BsPhoneVibrate } from "react-icons/bs";

export default function Menu() {
  // Array of icons in the same order as menuArray
  const icons = [
    GiLargeDress,
    GiClothes,
    GiHeadphones,
    GiWatch,
    HiOutlineHome,
    GiHealthCapsule,
    GiBallerinaShoes,
    GiBigDiamondRing,
    GiSportMedal,
    FaBaby,
    BiCameraMovie,
    MdOutlineSportsEsports,
    BsPhoneVibrate,
    MdOutlineSmartToy,
    BiGift,
    Gi3DHammer,
    AiOutlineSecurityScan,
  ];

  return (
    <div className={styles.menu}>
      <ul>
        {/* Categories header */}
        <li className={styles.menu__header}>
          <BiCategory />
          <b>Categories</b>
        </li>

        <div className={styles.menu__list}>
          {menuArray.map((item, i) => {
            const Icon = icons[i]; // pick icon by index
            return (
              <li key={item.name}>
                <Link href={item.link}>
                  <a>
                    {Icon && <Icon />}
                    <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
}
