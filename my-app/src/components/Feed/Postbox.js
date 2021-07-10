import { useState } from "react";
import { uploadPic } from "../uploadpic";
import { Icon, Loader } from "semantic-ui-react";
import styles from "../../styles/Postbox.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { submitNewPost } from "../../Redux/slices/postsSlice";
import { useAuth } from "../../context/authContext";
function Postbox({ user }) {
  const { auth } = useAuth();
  const postsData = useSelector((state) => state.postsReducer);

  const [newPost, setNewPost] = useState({ text: "", location: "" });
  const [media, setMedia] = useState(null);
  const { text, location } = newPost;

  const dispatch = useDispatch();

  async function submitHandler(e) {
    e.preventDefault();
    let picUrl = null;
    if (media !== null) {
      picUrl = await uploadPic(media);
      if (!picUrl) {
        console.log("Error Uploading Image");
      }
    }
    const req = { text, location, picUrl };

    dispatch(submitNewPost(req));

    if (postsData.status === "succeeded" || postsData.status === "failed") {
      setMedia(null);
      setNewPost({ text: "", location: "" });
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
    }
    setNewPost((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className={styles.share}>
      <div className={styles.shareWrapper}>
        <div className={styles.shareTop}>
          <Link to={`/${user.username}`}>
            <img
              className={styles.shareProfileImg}
              src={user.profilePicUrl}
              alt=""
            />
          </Link>
          <textarea
            name="text"
            placeholder={"What's in your mind " + user.name + "?"}
            className={styles.shareInput}
            value={text}
            onChange={handleChange}
          />
        </div>
        <hr className={styles.shareHr} />
        {media && (
          <div className={styles.shareImgContainer}>
            <img
              className={styles.shareImg}
              src={URL.createObjectURL(media)}
              alt=""
            />
            <Icon
              name="cancel"
              className={styles.shareCancelImg}
              onClick={() => setMedia(null)}
            />
          </div>
        )}
        <form className={styles.shareBottom} onSubmit={submitHandler}>
          <div className={styles.shareOptions}>
            <label htmlFor="file" className={styles.shareOption}>
              <Icon name="images" className={styles.shareIcon} />
              <span className={styles.shareOptionText}>Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name="media"
                accept=".png,.jpeg,.jpg"
                onChange={handleChange}
              />
            </label>
            <div className={styles.shareOption}>
              <Icon name="map marker" className={styles.shareIcon} />
              <span className={styles.shareOptionText}>Location</span>
            </div>
            <div className={styles.shareOption}>
              <Icon name="smile outline" className={styles.shareIcon} />
              <span className={styles.shareOptionText}>Feelings</span>
            </div>
          </div>
          <button className={styles.shareButton} type="submit">
            {postsData.status === "loading" ? (
              <Loader active inline="centered" size="tiny" />
            ) : (
              `Echo`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Postbox;
