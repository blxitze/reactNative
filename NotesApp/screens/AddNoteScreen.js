import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { NotesContext } from '../context/NotesContext';

const AddNoteScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addNote } = useContext(NotesContext);
  
  const handleSave = () => {
    if (title.trim() === '') {
      alert('Please enter a title');
      return;
    }
    
    addNote(title, content);
    navigation.goBack();
  };
  
  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Content"
        value={content}
        onChangeText={setContent}
        style={styles.contentInput}
        multiline
        numberOfLines={10}
        mode="outlined"
      />
      <Button 
        mode="contained" 
        onPress={handleSave} 
        style={styles.button}
      >
        Save Note
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 15,
  },
  contentInput: {
    marginBottom: 15,
    height: 200,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: '#2196F3',
  },
});

export default AddNoteScreen;