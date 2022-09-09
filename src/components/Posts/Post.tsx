import { useAppDispatch } from '../../store/hooks';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../store/usersSlice';

import { Link } from 'react-router-dom';

import { Post } from '../../store/postsSlice';

import PostReactions from './PostReactions';
import PostBody from './PostBody';

const PostsInfo: React.FC<Post> = (post) => {
  const users = useSelector(selectAllUsers);

  const postUser = users.find((user) => user.id === post?.userId);

  return (
    <article className="border-solid border border-black rounded-xl p-8 m-auto mb-5 gap-5 flex flex-col xl:w-1/3 md:w-3/5 last-of-type:mb-0 relative">
      <PostBody title={post.title} body={post.body} postId={post.id}>
        <div>
          <p>
            <Link
              className="underline hover:text-gray-700"
              to={`/posts/${post?.id}`}
            >
              View Post
            </Link>{' '}
            by{' '}
            <Link
              className="underline hover:text-gray-700"
              to={`/users/${postUser?.id}`}
            >
              {postUser?.name}
            </Link>
          </p>
        </div>
      </PostBody>

      <PostReactions reactions={post.reactions} postId={post.id} />
    </article>
  );
};

export default PostsInfo;
