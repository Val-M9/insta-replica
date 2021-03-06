import { useState, useEffect } from "react";
import { getPhotos } from "../services/firebaseServices";

const usePhotos = (user) => {
  const [photos, setPhotos] = useState(null);
  useEffect(() => {
    async function getTimelinePhotos() {
      if (user?.following?.length > 0) {
        let followedUserPhotos = [];
        followedUserPhotos = await getPhotos(user.userId, user.following);
        // set newest photo to the top (by dateCreated)
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId, user?.following]);

  return { photos };
};
export default usePhotos;
