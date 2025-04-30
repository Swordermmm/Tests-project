import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";

import * as AuthService from "../../apis/auth.api";

import styles from "./Header.module.scss";

const logout = () => {
  AuthService.logout();
};

const links = {
  navLinks: [
    { label: "Мои тесты", to: "/main" },
    { label: "Ручная проверка", to: "/check" },
    { label: "Статистика", to: "/stats" },
  ],
};

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <nav>
          <ul className={styles["nav-list"]}>
            {links.navLinks.map((navLink) => (
              <li key={navLink.to}>
                <NavLink
                  to={navLink.to}
                  className={({ isActive }) =>
                    classNames(styles["nav-link"], {
                      [styles.active]: isActive,
                    })
                  }
                >
                  {navLink.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a href="/login" className={styles["nav-link"]} onClick={logout}>
                Выйти
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
