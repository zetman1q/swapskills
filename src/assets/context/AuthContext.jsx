import React, { useContext, createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to get users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  };

  // Helper function to save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Helper function to get user profiles from localStorage
  const getUserProfiles = () => {
    const profiles = localStorage.getItem('userProfiles');
    return profiles ? JSON.parse(profiles) : {};
  };

  // Helper function to save user profiles to localStorage
  const saveUserProfiles = (profiles) => {
    localStorage.setItem('userProfiles', JSON.stringify(profiles));
  };

  async function signup(email, password, displayName, onProgress) {
    try {
      if (onProgress) onProgress('Creating user account...');

      const users = getUsers();
      if (users[email]) {
        throw new Error('User already exists');
      }

      const uid = uuidv4();
      const user = {
        uid,
        email,
        password, // Note: In production, never store plain passwords
        displayName,
        createdAt: new Date().toISOString()
      };

      users[email] = user;
      saveUsers(users);

      // Create user profile
      const profiles = getUserProfiles();
      profiles[uid] = {
        uid,
        email,
        displayName,
        createdAt: new Date().toISOString(),
        skills: [],
        bio: ''
      };
      saveUserProfiles(profiles);

      if (onProgress) onProgress('Profile setup complete!');

      // Simulate user object
      const userResult = { user };

      // Set current user
      setCurrentUser(user);

      return userResult;
    } catch (error) {
      throw error;
    }
  }

  // Login function
  async function login(email, password) {
    try {
      const users = getUsers();
      const user = users[email];

      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }

      // Set current user
      setCurrentUser(user);

      return { user };
    } catch (error) {
      throw error;
    }
  }

  // Logout function
  async function logout() {
    try {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    } catch (error) {
      throw error;
    }
  }

  //Get user profile data
  async function getUserProfile(uid) {
    try {
      const profiles = getUserProfiles();
      return profiles[uid] || null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  // Update user profile
  async function updateUserProfile(uid, profileData) {
    try {
      const profiles = getUserProfiles();
      if (profiles[uid]) {
        profiles[uid] = { ...profiles[uid], ...profileData };
        saveUserProfiles(profiles);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  useEffect(() => {
    // Check for stored current user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Update localStorage when currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    getUserProfile,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
