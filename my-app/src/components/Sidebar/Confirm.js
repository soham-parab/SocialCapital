import styles from "../../styles/Confirm.module.css";
import { Icon } from "semantic-ui-react";
import { logoutUser } from "../../utilsClient/authUser";

function ConfirmLogout({ setViewModal }) {
  function submitHandler(e) {
    e.preventDefault();

    if (e.target.name === "btn") {
      logoutUser();
    }
  }

  return (
    <div
      className={styles.modalBg}
      onClick={(e) => {
        submitHandler(e);
      }}
    >
      <form className={styles.editModal} onSubmit={(e) => submitHandler(e)}>
        <div className={styles.modalText}>
          Do you want to log out?
          <Icon name="close" onClick={() => setViewModal(false)} />
        </div>
        <button name="btn" type="submit">
          Yes
        </button>
      </form>
    </div>
  );
}

export default ConfirmLogout;
