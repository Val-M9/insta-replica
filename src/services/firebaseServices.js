import { firebase, FieldValue } from "../lib/firebaseLib";

export async function doesUsernameExists(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

// get user from firestore where userId === userId (passed from auth)
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection("users").where("userId", "==", userId).get();
  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

// get suggested profiles from firestore
export async function getSuggestedUsers(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

// updating logged user followin array and followers array of followed user
export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isProfileFollowed) {
  // 1st param: logged in user doc id
  // 2nd param: the profileId of user whom will follow/unfollow
  // 3rd param: boolean value is the user followed already
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isProfileFollowed
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  profileDocId, //again docId
  loggedInUserId, //and userId who requests following
  isProfileFollowed
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isProfileFollowed
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId),
    });
}

// get photos to render in Timeline
export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const followedUserPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    followedUserPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return response.userId;
}

export async function toggleFollow(
  activeUserDocId,
  profileUserId,
  followingUserId,
  profileDocId,
  isFollowingProfile
) {
  // pass DocId for what doc to update and UserId for who make changes
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
