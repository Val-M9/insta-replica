import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getSuggestedUsers } from "../../services/firebaseServices";

const Suggestions = ({ userId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function getProfiles() {
      const response = await getSuggestedUsers();
      setProfiles(response);
    }
    getProfiles();
  }, [userId]);

  console.log("users", profiles);
  console.log("sugest", getSuggestedUsers());

  return !profiles ? (
    <Skeleton count={1} height={61} />
  ) : (
    <div>
      {" "}
      <h1>Suggestions for you</h1>
      {profiles.map((user) => {
        return (
          <Link to={`/p/${user.username}`} key={userId}>
            <div className="flex items-center justify-between col-span-1">
              <img
                className="rounded-full w-16 h-16 mr-3"
                src={`/images/avatars/${user.username}.jpg`}
                alt={`${user.username}`}
              />
            </div>
            <div className="col-span-2">
              <p className="font-bold text-sm">{user.username}</p>
              <p className="text-sm">{user.fullName}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

Suggestions.propTypes = {
  userId: PropTypes.string,
};

export default Suggestions;
