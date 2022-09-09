import { addNewPost } from '../store/postsSlice';

import PostForm from '../components/Posts/PostForm';

const initialState = {
  contentTitle: '',
  contentBody: '',
  isContentValid: true,
  userId: 0,
};

const CreatePost: React.FC = () => {
  return <PostForm initialValue={initialState} onSubmitFun={addNewPost} />;
};

export default CreatePost;
