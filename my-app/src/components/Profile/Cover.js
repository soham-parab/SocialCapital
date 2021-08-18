import styles from "../../styles/Cover.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileStats } from "../../Redux/slices/profileSlice";
import { useEffect } from "react";

function Cover({ username }) {
  const profileData = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const profileStats = profileData.profile;

  useEffect(() => {
    dispatch(fetchProfileStats(username));
  }, []);

  return (
    <>
      {!profileStats.followers ? (
        "loading"
      ) : (
        <>
          <div className={styles.profileRight}>
            <div className={styles.profileRightTop}>
              <div className={styles.profileCover}>
                <img
                  className={styles.profileCoverImg}
                  src="https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg"
                  alt=""
                />
                <img
                  className={styles.profileUserImg}
                  src={
                    profileStats.profile &&
                    profileStats.profile.user.profilePicUrl
                  }
                  alt=""
                />
              </div>
              <div className={styles.profileInfo}>
                <h4 className={styles.profileInfoName}>
                  {profileStats.profile && profileStats.profile.user.name}
                </h4>
                <p className={styles.profileInfoStats}>
                  {`${
                    profileStats.followers && profileStats.followers.length
                  } Followers ${
                    profileStats.following && profileStats.following.length
                  } Following`}
                </p>
                <span className={styles.profileInfoDesc}>
                  {profileStats.profile && profileStats.profile.bio}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cover;
