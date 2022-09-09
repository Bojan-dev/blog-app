import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { editPost } from '../../store/postsSlice';
import { selectAllPosts } from '../../store/postsSlice';

import PostForm from './PostForm';

const EditPost = () => {
  const postId = Number(useParams().postId);
  const posts = useSelector(selectAllPosts);

  const selectedPost = posts.find((post) => post.id === postId);

  const initialState = {
    contentTitle: '',
    contentBody: '',
    isContentValid: true,
    userId: 0,
  };

  if (selectedPost) {
    initialState.contentBody = selectedPost.body;
    initialState.contentTitle = selectedPost.title;
    initialState.userId = selectedPost.userId;
  }

  return (
    <PostForm
      initialValue={initialState}
      onSubmitFun={editPost}
      postId={postId}
    />
  );
};

export default EditPost;
