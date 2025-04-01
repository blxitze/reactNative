import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  
  // Load notes from storage when app starts
  useEffect(() => {
    loadNotes();
  }, []);
  
  // Save notes to AsyncStorage whenever they change
  useEffect(() => {
    saveNotes();
  }, [notes]);
  
  const loadNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('notes');
      if (jsonValue != null) {
        setNotes(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };
  
  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };
  
  const addNote = (title, content) => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };
  
  const updateNote = (id, title, content) => {
    setNotes(
      notes.map(note => 
        note.id === id 
          ? { 
              ...note, 
              title, 
              content, 
              updatedAt: new Date().toISOString() 
            } 
          : note
      )
    );
  };
  
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
  return (
    <NotesContext.Provider 
      value={{ 
        notes, 
        addNote, 
        updateNote, 
        deleteNote 
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};