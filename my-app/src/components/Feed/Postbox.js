import { useState } from "react";
// import { uploadPic } from "../uploadpic";
import { Icon, Loader } from "semantic-ui-react";
import styles from "../../styles/Postbox.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { submitNewPost } from "../../Redux/slices/postsSlice";
import { useAuth } from "../../context/authContext";
import { Avatar, Textarea, Flex, Button } from "@chakra-ui/react";
function Postbox({ user }) {
  const { auth } = useAuth();
  const postsData = useSelector((state) => state.postsReducer);

  const [newPost, setNewPost] = useState({ text: "", location: "" });

  const { text, location } = newPost;

  const dispatch = useDispatch();

  async function submitHandler(e) {
    e.preventDefault();

    const req = { text, location };

    dispatch(submitNewPost(req));

    if (postsData.status === "succeeded" || postsData.status === "failed") {
      setNewPost({ text: "", location: "" });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setNewPost((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Flex
      height={"20vh"}
      width={"100%"}
      alignItems={"start"}
      justifyContent={"space-around"}
      paddingY="9"
    >
      <Link to={`/${user.username}`}>
        <Avatar name={user.username} src={user.profilePicUrl} />
      </Link>
      <textarea
        style={{ width: "80%", height: "10vh" }}
        name="text"
        value={text}
        onChange={handleChange}
        placeholder={"What's up " + user.name + "?"}
        className={styles.shareInput}
      />

      {/* <Textarea
        width={"80%"}
        placeholder={"What's up " + user.name + "?"}
        value={text}
        onChange={handleChange}
      /> */}

      <form onSubmit={submitHandler}>
        {/* <label htmlFor="file" className={styles.shareOption}>
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
            </label> */}

        <Button
          color={"white"}
          _hover={{ bg: "blue", color: "white" }}
          bg={"#315CFD"}
          type="submit"
        >
          {postsData.status === "loading" ? (
            <Loader active inline="centered" size="tiny" />
          ) : (
            `Post`
          )}
        </Button>
      </form>
    </Flex>
  );
}

export default Postbox;
