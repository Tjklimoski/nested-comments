import React from "react";
import styles from "./iconBtn.module.css";

export default function IconBtn({ Icon, isActive, color, children, ...props }) {
  return (
    <button
      className={`btn ${styles.iconBtn} ${
        color === "danger" ? styles.danger : ""
      } ${isActive ? styles.iconBtnActive : ""}`}
      {...props}
    >
      {/* If children passed, add a margin between the icon and the children */}
      <Icon className={`${children != null ? "mr-1" : ""}`} />
      {children}
    </button>
  );
}
