import React, { useContext, useState } from 'react';
import { PostsContext } from '../contexts/PostsContext';

const Profile = () => {
  const { currentUser, updateProfile } = useContext(PostsContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    updateProfile({ ...currentUser, name, bio });
    setEditing(false);
  };

  const handleCancel = () => {
    setName(currentUser.name);
    setBio(currentUser.bio);
    setEditing(false);
  };

  return (
    <div>
      <h1>Profile</h1>
      {!editing ? (
        <div>
          <h2>{currentUser.name}</h2>
          <p>{currentUser.bio}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      ) : (
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Bio:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Profile;