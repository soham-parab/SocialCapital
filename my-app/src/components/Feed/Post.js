import { useState } from "react";
import { Icon } from "semantic-ui-react";
import styles from "../../styles/Post.module.css";
import calculateTime from "../../utilsClient/calculateTime";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../Redux/slices/postsSlice";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/authContext";
import { Avatar, Textarea, Flex, Button, Box } from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  DeleteIcon,
  CheckIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
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
    <Flex width={"100%"} alignItems={"center"} justifyContent={"center"}>
      <Flex
        border={"1px"}
        marginY={"3"}
        paddingY={"3"}
        direction={"column"}
        width={"50%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <div className={styles.postTopRight}>
          <div className={styles.leftDiv}>
            <Link to={`/${post.user.username}`}>
              <Avatar
                padding={"1rem"}
                name={user.username}
                src={user.profilePicUrl}
              />

              {/* <img
              className={styles.postProfileImg}
              src={post.user.profilePicUrl}
              alt=""
            /> */}
            </Link>
            <span className={styles.postUsername}>{post.user.name}</span>
          </div>

          <div className={styles.rightDiv}>
            <span className={styles.postDate}>
              {calculateTime(post.createdAt)}
            </span>

            {user._id === post.user._id && (
              <DeleteIcon
                cursor={"pointer"}
                onClick={() => setViewDeleteConfirm((prev) => !prev)}
              />
            )}
          </div>

          <div
            className={styles.confirmDelete}
            style={{ display: viewDeleteConfirm ? "" : "none" }}
          >
            <CheckIcon
              cursor={"pointer"}
              onClick={() => {
                setViewDeleteConfirm((prev) => !prev);
                dispatch(deletePost(post._id));
              }}
            />

            <SmallCloseIcon
              cursor={"pointer"}
              onClick={() => setViewDeleteConfirm((prev) => !prev)}
            />
          </div>
        </div>

        <div className={styles.postCenter}>
          <span className={styles.postText}>{post.text}</span>
          <img className={styles.postImg} src={post.picUrl} alt="" />
        </div>

        {!isLiked ? (
          <RiThumbUpFill cursor={"pointer"} onClick={likeHandler} />
        ) : (
          <RiThumbDownFill cursor={"pointer"} onClick={likeHandler} />
        )}
        <span className={styles.postLikeCounter}>
          {likes.length} people like it
        </span>
      </Flex>
    </Flex>
  );
}

export default Post;
