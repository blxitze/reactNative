import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { NotesContext } from '../context/NotesContext';

const NoteDetailScreen = ({ route, navigation }) => {
  const { noteId } = route.params;
  const { notes, updateNote, deleteNote } = useContext(NotesContext);
  
  const note = notes.find(note => note.id === noteId);
  
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [isEditing, setIsEditing] = useState(false);
  
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
            onPress={() => {
              console.log('Force delete attempt');
              console.log('Current notes:', notes);
              console.log('Note ID to delete:', noteId);
              deleteNote(noteId);
              navigation.goBack();
            }}
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
            console.log('Deleting note with ID:', noteId);
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
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  input: {
    marginBottom: 18,
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  contentInput: {
    marginBottom: 18,
    minHeight: 240,
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 6,
    backgroundColor: '#6200ee',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 6,
    borderColor: '#6200ee',
  },
  forceDeleteButton: {
    marginTop: 30,
    backgroundColor: '#b00020', 
    paddingVertical: 6,
  },
  deleteIcon: {
    marginRight: 6,
  },
  addNoteTitleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  addNoteTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginVertical: 12,
  },
  addNoteSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  }
});

export default NoteDetailScreen;