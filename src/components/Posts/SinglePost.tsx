import { useSelector } from 'react-redux';
import { selectAllPosts } from '../../store/postsSlice';
import { selectAllUsers } from '../../store/usersSlice';

import { useParams, Link } from 'react-router-dom';

import PostBody from './PostBody';
import PostReactions from './PostReactions';
import NoInfoFound from '../UI/NoInfoFound';

const SinglePost: React.FC = () => {
  const allPosts = useSelector(selectAllPosts);
  const allUsers = useSelector(selectAllUsers);
  const postId = Number(useParams().postId);

  const selectedPost = allPosts.find((post) => post.id === postId);
  const selectedUser = allUsers.find(
    (user) => user.id === selectedPost?.userId
  );

  return selectedPost ? (
    <article className="border-solid border border-black rounded-xl p-8 w-1/3 m-auto mb-5 gap-5 flex flex-col relative">
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
