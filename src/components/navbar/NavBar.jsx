"use client";

import * as React from "react";
import { BarChart2, Home, Menu } from "lucide-react";
import styles from "./NavBar.module.scss";
import { Link, useLocation } from "react-router";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Map", path: "/map", icon: BarChart2 },
  { name: "Table", path: "/table", icon: BarChart2 },
];

export function Navbar() {
  const location = useLocation();

  console.log({location: location.pathname})
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navbarDesktop}>
          <Link to="/" className={styles.brandLink}>
            <span className={styles.brandText}>EV Dashboard</span>
          </Link>
          <nav className={styles.navLinks}>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={`${styles.navLink} ${ location.pathname === item.path ? styles.activeLink : styles.inactiveLink }`} >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
