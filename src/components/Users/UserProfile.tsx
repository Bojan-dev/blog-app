import { RootState } from '../../store/store';
import { selectUser } from '../../store/usersSlice';

import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import NoInfoFound from '../UI/NoInfoFound';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const userId = Number(useParams().userId);

  const selectedUser = useSelector((state) =>
    selectUser(state as RootState, userId)
  );

  if (!selectedUser) {
    return <NoInfoFound text={`Selected user doesn't exist, return back:`} />;
  }

  return (
    <div className="flex flex-col border border-black gap-6 p-8">
      <div className="border border-black py-4 grid place-items-center">
        <FontAwesomeIcon icon={faUser} size={'3x'} type={'regular'} />
      </div>
      <div className="flex items-end">
        <p>Name:</p> &nbsp; <h3 className="font-bold">{selectedUser.name}</h3>
      </div>
      <div className="flex items-end">
        <p>Email:</p> &nbsp; <h3 className="font-bold">{selectedUser.email}</h3>
      </div>
      <div className="flex items-end">
        <p>Username:</p> &nbsp;{' '}
        <h3 className="font-bold">{selectedUser.username}</h3>
      </div>
    </div>
  );
};

export default UserProfile;
