import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../store/hooks';
import { removePost } from '../../store/postsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type PostBodyProps = {
  title: string | undefined;
  body: string | undefined;
  postId: number | undefined;
  goBack?: boolean;
};

const PostBody: React.FC<React.PropsWithChildren<PostBodyProps>> = ({
  title,
  body,
  postId,
  goBack = false,
  children,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <FontAwesomeIcon
        icon={faXmark}
        size={'xl'}
        color={'#F55D65'}
        className="absolute right-0 top-0 mt-5 mr-5 cursor-pointer hover:scale-110"
        onClick={() => {
          dispatch(removePost(postId));

          if (goBack) navigate('/');
        }}
      />
      <h2 className="lg:text-3xl text-2xl font-semibold break-words ">
        {title}
      </h2>
      <h4 className="lg:text-lg text-base font-medium italic text-gray-900">
        {body}
      </h4>
      {children}
    </>
  );
};

export default PostBody;
