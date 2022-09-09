import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';
import NotFound from './pages/NotFound';

import Posts from './pages/Posts';
import SinglePost from './components/Posts/SinglePost';
import CreatePost from './pages/CreatePost';
import EditPost from './components/Posts/EditPost';
import Users from './pages/Users';

import UserProfile from './components/Users/UserProfile';

import MarginCard from './components/UI/MarginCard';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <MarginCard>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="*" element={<NotFound />} />
          <Route path="posts" element={<Posts />}></Route>
          <Route path="posts/:postId" element={<SinglePost />} />
          <Route path="new-post" element={<CreatePost />} />
          <Route path="new-post/:postId" element={<EditPost />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserProfile />} />
        </Routes>
      </MarginCard>
    </BrowserRouter>
  );
}

export default App;
