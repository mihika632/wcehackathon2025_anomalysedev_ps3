import { getAuth } from "firebase/auth";

export const getFirebaseToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken(); // Get Firebase JWT Token
  }
  return null;
};
