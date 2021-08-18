import styles from "../../styles/Sidebar.module.css";
import SidebarItem from "./SidebarItem";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmLogout from "./Confirm";

function Sidebar({ user }) {
  const location = useRouter().pathname;
  const [viewModal, setViewModal] = useState(false);

  return (
    <div className={styles.sidebar}>
      <Link to="/" passHref>
        <SidebarItem
          text="Home"
          name="home"
          active={location === "/"}
          new={false}
        />
      </Link>
      <Link to="/explore" passHref>
        <SidebarItem
          text="Explore"
          name="hashtag"
          active={location === "/explore"}
          new={false}
        />
      </Link>
      <Link to="/notifications" passHref>
        <SidebarItem
          text="Notifications"
          name="bell"
          active={location === "/notifications"}
          new={user.unreadNotification}
        />
      </Link>

      <Link to="/messages" passHref>
        <SidebarItem
          text="Messages"
          name="envelope"
          active={location === "/messages"}
          new={user.unreadMessage}
        />
      </Link>
      <Link to={`/${user.username}`} passHref>
        <SidebarItem
          text="Profile"
          name="user"
          active={location === "/Profile"}
          new={false}
        />
      </Link>
      <div className={styles.profileCard}>
        <div className={styles.profileCardImage}>
          {user && (
            <img
              src={user.profilePicUrl}
              alt="profile"
              width={50}
              height={50}
            />
          )}
        </div>
        <div className={styles.profileCardNameCol}>
          <div className={styles.profileCardNameColName}>
            <span>{user.name}</span>
          </div>
          <div className={styles.profileCardNameColuserName}>
            <span>{`@${user.username}`}</span>
          </div>
        </div>
        <Icon
          name="log out"
          size="big"
          onClick={() => setViewModal((prev) => !prev)}
        />
      </div>
      {viewModal && <ConfirmLogout setViewModal={setViewModal} />}
    </div>
  );
}

export default Sidebar;
