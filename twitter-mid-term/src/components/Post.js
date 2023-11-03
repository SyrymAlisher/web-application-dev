import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostsContext } from '../contexts/PostsContext';

const Post = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { posts, likePost, dislikePost, deletePost, editPost } = useContext(PostsContext);

  const { postId } = useParams();
  const post = posts.find((p) => p.id === Number(postId));

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post ? post.content : '');

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleLike = () => {
    likePost(post.id);
  };

  const handleDislike = () => {
    dislikePost(post.id);
  };

  const handleDelete = () => {
    deletePost(post.id);
    navigate("/");
  };

  const handleEdit = () => {
    editPost(post.id, editedContent);
    setIsEditing(false);
  };

  return (
    <div>
      <h1>{post.title}</h1>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <p>{post.content}</p>
      )}
      <button onClick={handleLike}>Like ({post.likes || 0})</button>

      <button onClick={handleDislike}>Dislike ({post.dislikes || 0})</button>
      {isEditing ? (
        <button onClick={handleEdit}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Post;
