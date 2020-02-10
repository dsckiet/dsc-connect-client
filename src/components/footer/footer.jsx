import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className="container text-center">
      <p className={`${styles.footerText} mt-4`}>
        connect with us at connectwithcommunities@gmail.com
      </p>
    </div>
  );
}
