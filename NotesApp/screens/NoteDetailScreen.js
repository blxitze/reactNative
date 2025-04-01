import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { NotesContext } from '../context/NotesContext';

const NoteDetailScreen = ({ route, navigation }) => {
  const { noteId } = route.params;
  const { notes, updateNote, deleteNote } = useContext(NotesContext);
  
  // Find the note with the matching ID
  const note = notes.find(note => note.id === noteId);
  
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [isEditing, setIsEditing] = useState(false);
  
  // Add a delete button to the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon={isEditing ? "content-save" : "pencil"}
            onPress={isEditing ? handleSave : () => setIsEditing(true)}
            color="#2196F3"
          />
          <IconButton
            icon="delete"
            onPress={handleDelete}
            color="#FF5252"
          />
        </View>
      ),
    });
  }, [navigation, isEditing, title, content]);
  
  const handleSave = () => {
    if (title.trim() === '') {
      alert('Please enter a title');
      return;
    }
    
    updateNote(noteId, title, content);
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            deleteNote(noteId);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Note not found</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        mode="outlined"
        disabled={!isEditing}
      />
      <TextInput
        label="Content"
        value={content}
        onChangeText={setContent}
        style={styles.contentInput}
        multiline
        numberOfLines={20}
        mode="outlined"
        disabled={!isEditing}
      />
      
      {isEditing && (
        <View style={styles.buttonContainer}>
          <Button 
            mode="outlined" 
            onPress={() => {
              setTitle(note.title);
              setContent(note.content);
              setIsEditing(false);
            }}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button 
            mode="contained" 
            onPress={handleSave}
            style={styles.saveButton}
          >
            Save
          </Button>
        </View>
      )}
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
    minHeight: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
  },
});

export default NoteDetailScreen;