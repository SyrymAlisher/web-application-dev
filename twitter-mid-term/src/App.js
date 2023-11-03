import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PostsProvider } from './contexts/PostsContext';
import Feed from './components/Feed';
import Post from './components/Post'; 
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <PostsProvider>
      <Router>
        <div>
          <nav>
            <Link to="/">Feed</Link> | <Link to="/profile">Profile</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/post/:postId" element={<Post />} /> 
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </PostsProvider>
  );
}

export default App;
