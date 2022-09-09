import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { editPost } from '../../store/postsSlice';
import { selectPost } from '../../store/postsSlice';
import { RootState } from '../../store/store';

import PostForm from './PostForm';

const EditPost = () => {
  const postId = Number(useParams().postId);

  const selectedPost = useSelector((state) =>
    selectPost(state as RootState, postId)
  );

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
