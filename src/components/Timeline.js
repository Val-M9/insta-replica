import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import LoggedInUserContext from "../context/LoggedInUserContext";
import usePhotos from "../hooks/use-photos";
import Post from "./Post/Post";

const Timeline = () => {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);
  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={440} height={400} className="mb-5" />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
};

export default Timeline;
