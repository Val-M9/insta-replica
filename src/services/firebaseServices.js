import { firebase, FieldValue } from "../lib/firebaseLib";

export async function doesUsernameExists(username) {
  const result = await firebase.firestore().collection("users").where("username", "==", username).get();
  return result.docs.map((user) => user.data().length > 0);
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
export async function getSuggestedUsers() {
  const result = await firebase.firestore().collection("users").get();
  return result.docs.map((user) => user.data());
}
