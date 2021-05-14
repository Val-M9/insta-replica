import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { getUserByUsername, getUserPhotosByUsername } from "../../services/firebaseServices";

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: [],
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoWithPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      // dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    }
    if (user.username) {
      getProfileInfoWithPhotos();
    }
  }, [user.username]);

  return (
    <>
      <Header />
    </>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
