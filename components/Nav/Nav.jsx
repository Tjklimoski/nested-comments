"use client";

import React from "react";
import styles from "./Nav.module.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      {pathname && pathname !== "/" && (
        <button
          className={`btn ${styles.backBtn}`}
          onClick={() => router.back()}
        >
          <IoArrowBack size={15} className={styles.backArrow} />
          Go Back
        </button>
      )}
    </div>
  );
}
