import React from "react";
import styles from "./iconBtn.module.css";

export default function IconBtn({ Icon, isActive, color, children, ...props }) {
  return (
    <button
      className={`${styles.btn} ${styles.iconBtn} ${
        color === "danger" ? styles.danger : ""
      } ${isActive ? styles.iconBtnActive : ""}`}
      {...props}
    >
      {/* If children passed, add a margin between the icon and the children */}
      <span className={`${children ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
