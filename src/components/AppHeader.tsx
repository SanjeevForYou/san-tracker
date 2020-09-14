import React, { useState } from "react";
import styles from "./AppHeader.module.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";

interface ISideBar {
  onClose: () => void;
}

const SideBar = (props: ISideBar) => (
  <div className={styles.sideBar}>
    <ul className={styles.menu}>
      <li className={styles.logo}>
        <div style={{ padding: 5, width: "100%", height: 20, margin: 0 }}>
          <div>
            <VscAccount size={100} />
          </div>
          Sanjeev Bhusal
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "start",
          }}
        >
          <div
            style={{
              textAlign: "end",
              display: "block",
              backgroundColor: "blanchedalmond",
              cursor: "pointer",
            }}
            onClick={props.onClose}
          >
            <AiOutlineClose />
          </div>
        </div>
      </li>
      <li className={styles.item}>
        <a href="javascript:void(0)">Home</a>
      </li>
      <li className={styles.item}>
        <a href="javascript:void(0)">About</a>
      </li>
      <li className={styles.item}>
        <a href="javascript:void(0)">Contact</a>
      </li>
    </ul>
  </div>
);

export function AppHeader() {
  const [sideBarDisplay, setSideBarDisplay] = useState<boolean>(false);
  return (
    <header>
      {sideBarDisplay ? (
        <SideBar onClose={() => setSideBarDisplay(false)} />
      ) : null}

      <div className={styles.menuTeal}>
        <div
          className={styles.menuButton}
          onClick={() => setSideBarDisplay(true)}
        >
          <AiOutlineMenu />
        </div>

        <div className={styles.appBar}>
          <h2>San Tracker</h2>
        </div>
      </div>
    </header>
  );
}
