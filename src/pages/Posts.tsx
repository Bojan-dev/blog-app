import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPostsDataInfo } from '../store/postsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Post from '../components/Posts/Post';

const Posts: React.FC = () => {
  const { posts, status, error } = useSelector(selectPostsDataInfo);

  const [mainHeight, setMainHeight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (wrapperRef.current)
      setMainHeight(window.innerHeight - wrapperRef.current.offsetTop - 40);
  }, []);

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
          <Post key={post.id} {...post} />
        ))}
      </>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${mainHeight}px` }}
      className={`overflow-y-scroll overflow-x-hidden w-[90vw] m-auto py-8 grid place-items-center border px-4 md:px-0`}
    >
      {htmlContent}
    </div>
  );
};

export default Posts;
