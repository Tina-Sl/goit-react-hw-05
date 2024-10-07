import { NavLink } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFound = () => {
  return (
    <div className={s.boxMessage}>
      <h1 className={s.message}>404 Not Found</h1>
      <NavLink className={s.linkToBegin} to="/">
        <span className={s.toy}>&larr;&nbsp;</span>
        <span>go HOME</span>
      </NavLink>
    </div>
  );
};
export default NotFound;
