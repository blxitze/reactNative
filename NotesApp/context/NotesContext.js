import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    loadNotes();
  }, []);
  
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
      console.log('Saving notes to storage, count:', notes.length);
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      console.log('Notes saved successfully');
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
    console.log('Delete function called with id:', id);
    console.log('Before deletion, notes count:', notes.length);
    console.log('Notes IDs before deletion:', notes.map(n => n.id));
    
    const idToDelete = String(id);
    const updatedNotes = notes.filter(note => String(note.id) !== idToDelete);
    
    console.log('After filter, notes count:', updatedNotes.length);
    console.log('Notes IDs after deletion:', updatedNotes.map(n => n.id));
    
    setNotes(updatedNotes);
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