import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { selectPost } from '../../store/postsSlice';
import { selectUser } from '../../store/usersSlice';

import { useParams, Link } from 'react-router-dom';

import PostBody from './PostBody';
import PostReactions from './PostReactions';
import NoInfoFound from '../UI/NoInfoFound';

const SinglePost: React.FC = () => {
  const postId = Number(useParams().postId);
  const selectedPost = useSelector((state) =>
    selectPost(state as RootState, postId)
  );
  const selectedUser = useSelector((state) =>
    selectUser(state as RootState, selectedPost?.userId || 0)
  );

  return selectedPost ? (
    <article className="border-solid border border-black rounded-xl p-8 xl:w-1/3 md:w-3/5 m-auto mb-5 gap-5 flex flex-col relative">
      <PostBody
        title={selectedPost.title}
        body={selectedPost.body}
        postId={selectedPost.id}
        goBack={true}
      >
        <div>
          <p>
            <Link
              className="underline hover:text-gray-700"
              to={`/new-post/${selectedPost.id}`}
            >
              Edit Post
            </Link>{' '}
            by{' '}
            <Link
              className="underline hover:text-gray-700"
              to={`/users/${selectedUser?.id}`}
            >
              {selectedUser?.name}
            </Link>
          </p>
        </div>
      </PostBody>
      {selectedPost.reactions && (
        <PostReactions reactions={selectedPost.reactions} postId={postId} />
      )}
    </article>
  ) : (
    <NoInfoFound text={`Selected post doesn't exist, return back:`} />
  );
};

export default SinglePost;
