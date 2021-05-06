import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const User = ({ username, fullName }) => {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className="grid grid-cols-3 gap-2 mb-6 items-center">
      <div className="flex items-center justify-between col-span-1">
        <img className="rounded-full w-16 h-16 mr-3" src={`/images/avatars/${username}.jpg`} alt={`${username}`} />
      </div>
      <div className="col-span-2">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
};

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};

export default User;
