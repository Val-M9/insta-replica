import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import { getSuggestedUsers } from "../../services/firebaseServices";
import SuggestedProfile from "./SuggestedProfile";

const Suggestions = ({ userId, following }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function getProfiles() {
      const response = await getSuggestedUsers(userId, following);
      setProfiles(response);
    }
    if (userId) {
      getProfiles();
    }
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={1} height={61} />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base"> Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            userDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
};

export default Suggestions;
