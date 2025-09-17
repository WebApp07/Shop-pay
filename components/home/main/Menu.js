/* eslint-disable react/jsx-key */
import styles from "./styles.module.scss";
import { menuArray } from "../../../data/home";
import Link from "next/link";

// Import icons
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

// Array of icons mapped by index
const icons = [
  GiLargeDress, // 0
  GiClothes, // 1
  GiHeadphones, // 2
  GiWatch, // 3
  HiOutlineHome, // 4
  GiHealthCapsule, // 5
  GiBallerinaShoes, // 6
  GiBigDiamondRing, // 7
  GiSportMedal, // 8
  FaBaby, // 9
  BiCameraMovie, // 10
  MdOutlineSportsEsports, // 11
  BsPhoneVibrate, // 12
  MdOutlineSmartToy, // 13
  BiGift, // 14
  Gi3DHammer, // 15
  AiOutlineSecurityScan, // 16
];

export default function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        {/* Header */}
        <li>
          <a className={styles.menu__header}>
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>

        {/* Categories list */}
        {menuArray.map((item, i) => {
          const Icon = icons[i] || null;
          return (
            <li key={i} className={styles.menu__list}>
              <Link href={item.link}>
                <a>
                  {Icon && <Icon />}
                  <span>{item.name}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
