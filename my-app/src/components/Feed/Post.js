import { useState } from "react";
import { Icon } from "semantic-ui-react";
import styles from "../../styles/Post.module.css";
import calculateTime from "../../utilsClient/calculateTime";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../Redux/slices/postsSlice";
import { Link } from "react-router-dom";
function Post({ postId, user }) {
  const postsData = useSelector((state) => state.postsReducer);
  console.log(postsData);
  const post = postsData.posts.find((post) => post._id === postId);
  const likes = post.likes;

  const [viewDeleteConfirm, setViewDeleteConfirm] = useState(false);

  const dispatch = useDispatch();

  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user === user._id).length > 0;

  const likeHandler = async () => {
    const req = { postId: post._id, userId: user._id, like: !isLiked };
    dispatch(likePost(req));
  };

  return (
    <div key={postId} className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <div className={styles.postTopLeft}>
            <Link to={`/${post.user.username}`}>
              <img
                className={styles.postProfileImg}
                src={post.user.profilePicUrl}
                alt=""
              />
            </Link>
            <span className={styles.postUsername}>{post.user.name}</span>
            <span className={styles.postDate}>
              {calculateTime(post.createdAt)}
            </span>
          </div>
          <div className={styles.postTopRight}>
            {user._id === post.user._id && (
              <Icon
                name="trash"
                onClick={() => setViewDeleteConfirm((prev) => !prev)}
              />
            )}
            <div
              className={styles.confirmDelete}
              style={{ display: viewDeleteConfirm ? "" : "none" }}
            >
              <Icon
                name="check square"
                onClick={() => {
                  setViewDeleteConfirm((prev) => !prev);
                  dispatch(deletePost(post._id));
                }}
              />
              <Icon
                name="window close"
                onClick={() => setViewDeleteConfirm((prev) => !prev)}
              />
            </div>
          </div>
        </div>
        <div className={styles.postCenter}>
          <span className={styles.postText}>{post.text}</span>
          <img className={styles.postImg} src={post.picUrl} alt="" />
        </div>
        <div className={styles.postBottom}>
          <div className={styles.postBottomLeft}>
            {isLiked ? (
              <Icon
                className={styles.likeIcon}
                name="thumbs up"
                onClick={likeHandler}
              />
            ) : (
              <Icon
                className={styles.likeIcon}
                name="thumbs up outline"
                onClick={likeHandler}
              />
            )}
            <span className={styles.postLikeCounter}>
              {likes.length} people like it
            </span>
          </div>
          <div className={styles.postBottomRight}>
            <span className={styles.postCommentText}>
              {post.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
