import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/hooks';
import { selectPostsDataInfo, fetchPosts } from '../store/postsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import PostsInfo from '../components/Posts/PostsInfo';

const Posts: React.FC = () => {
  const { posts, status, error } = useSelector(selectPostsDataInfo);
  const dispatch = useAppDispatch();

  const [mainHeight, setMainHeight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }

    if (wrapperRef.current)
      setMainHeight(window.innerHeight - wrapperRef.current.offsetTop - 40);
  }, [dispatch, status]);

  let htmlContent: JSX.Element;

  if (status === 'loading') {
    htmlContent = (
      <FontAwesomeIcon
        size="4x"
        icon={faSpinner}
        className="animate-spin-slower"
      />
    );
  } else if (status === 'failed') {
    htmlContent = <h2 className="text-xl">{error}</h2>;
  } else {
    htmlContent = (
      <>
        {posts.map((post) => (
          <PostsInfo key={post.id} {...post} />
        ))}
      </>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${mainHeight}px` }}
      className={`overflow-y-scroll overflow-x-hidden w-[90vw] m-auto py-8 flex flex-col align-center border px-4 md:px-0`}
    >
      {htmlContent}
    </div>
  );
};

export default Posts;
