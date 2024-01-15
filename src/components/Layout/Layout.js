import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <div>
      <header className={css.wraper}>
        <nav>
          <ul className={css.list}>
            <li className={css.pageItem}>
              <NavLink className={css.pageLink} to="/">
                Home
              </NavLink>
            </li>
            <li className={css.pageItem}>
              <NavLink className={css.pageLink} to="movies">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
