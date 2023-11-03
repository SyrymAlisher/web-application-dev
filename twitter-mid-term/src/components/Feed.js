import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext } from '../contexts/PostsContext';

const Feed = () => {
  const { posts, addPost } = useContext(PostsContext);
  const [newPostContent, setNewPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      addPost(newPostContent);
      setNewPostContent('');
    }
  };

  return (
    <div>
      <h1>Feed</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="What's happening?"
        />
        <button type="submit">Tweet</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;