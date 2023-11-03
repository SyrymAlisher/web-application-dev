import React, { createContext, useState } from 'react';

export const PostsContext = createContext(null);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: 'ALisher Syrym',
    bio: 'This is a bio',
  });

  const addPost = (content) => {
    const newPost = {
      id: Date.now(), 
      content: content,
    };
    setPosts([...posts, newPost]);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const editPost = (postId, newContent) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, content: newContent } : post)));
  };

  const likePost = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
  };

  const dislikePost = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, dislikes: (post.dislikes || 0) + 1 } : post
      )
    );
  };
  
  const updateProfile = (profile) => {
    setCurrentUser(profile);
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        deletePost,
        editPost,
        likePost,
        dislikePost,
        currentUser,
        updateProfile,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};