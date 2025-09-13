import React, { useState, createContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SkillsContext = createContext();
export { SkillsContext };

export function SkillsProvider({ children }) {
  // Default skills to show when database is empty or not connected
  const defaultSkills = [
    {
      id: 'default-1',
      name: 'Web Development',
      description: 'Build modern websites and web apps using HTML, CSS, JavaScript, and React.',
      availability: 'Mon, Wed, Fri (5pm - 8pm)',
      ratings: 5,
      userId: 'demo-user-1',
      userName: 'Ali Alawieh',
      userPhone: '123456789',
      userEmail: 'ali@example.com',
      createdAt: new Date().toISOString()
    },
    {
      id: 'default-2',
      name: 'Graphic Design',
      description: 'Create stunning graphics and visuals using Photoshop and Illustrator',
      availability: 'Tue, Thu (4pm - 7pm)',
      ratings: 4,
      userId: 'demo-user-2',
      userName: 'Sara Smith',
      userPhone: '987654321',
      userEmail: 'sara@example.com',
      createdAt: new Date().toISOString()
    },
    {
      id: 'default-3',
      name: 'Mobile App Development',
      description: 'Build cross-platform mobile apps using React Native and Flutter',
      availability: 'Weekends (10am - 6pm)',
      ratings: 5,
      userId: 'demo-user-3',
      userName: 'Mike Johnson',
      userPhone: '555123456',
      userEmail: 'mike@example.com',
      createdAt: new Date().toISOString()
    },
    
  ];

  const [skills, setSkills] = useState(() => {
    // Load skills from localStorage or use defaultSkills
    const storedSkills = localStorage.getItem('skills');
    return storedSkills ? JSON.parse(storedSkills) : defaultSkills;
  });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // Save skills to localStorage whenever skills state changes
  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  // Add a new skill
  const addSkill = async (skillData) => {
    try {
      const newSkill = {
        id: uuidv4(),
        ...skillData,
        createdAt: new Date().toISOString()
      };
      setSkills(prev => [newSkill, ...prev]);
      return { success: true, id: newSkill.id };
    } catch (error) {
      console.error('Error adding skill:', error);
      return { success: false, error: error.message };
    }
  };

  // Update a skill
  const updateSkill = async (skillId, updates) => {
    try {
      setSkills(prev => prev.map(skill =>
        skill.id === skillId ? { ...skill, ...updates, updatedAt: new Date().toISOString() } : skill
      ));
      return { success: true };
    } catch (error) {
      console.error('Error updating skill:', error);
      return { success: false, error: error.message };
    }
  };

  // Delete a skill
  const deleteSkill = async (skillId) => {
    try {
      setSkills(prev => prev.filter(skill => skill.id !== skillId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting skill:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    skills,
    setSkills,
    // loading,
    // error,
    addSkill,
    updateSkill,
    deleteSkill
  };

  return (
    <SkillsContext.Provider value={value}>
      {children}
    </SkillsContext.Provider>
  );
}
