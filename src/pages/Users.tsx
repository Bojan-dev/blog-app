import { useSelector } from 'react-redux';
import { selectAllUsers } from '../store/usersSlice';

import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector(selectAllUsers);
  return (
    <div className="flex flex-col text-center gap-4">
      <h2 className="text-2xl underline">LIST OF USERS:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className=" my-3">
            <Link
              to={`/users/${user.id}`}
              className="border-main-purple hover:border-b-2"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
