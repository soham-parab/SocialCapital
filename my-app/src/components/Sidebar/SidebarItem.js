import style from "../../styles/SidebarItem.module.css";
import { Icon } from "semantic-ui-react";
import React from "react";

const SidebarItem = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    {...props}
    className={`${style.sidebarItem} ${
      props.active && style["sidebarItem--active"]
    }`}
  >
    <Icon className={style.sidebaricon} name={props.name} size="big" />
    {props.new && <span className={style.badge}></span>}
    <span>{props.text}</span>
  </div>
));

export default SidebarItem;
