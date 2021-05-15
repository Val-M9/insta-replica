import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./Post/Post";

const Timeline = () => {
  const { photos } = usePhotos();
  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton className="mb-5" count={4} width={440} height={400} />
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
};

export default Timeline;
