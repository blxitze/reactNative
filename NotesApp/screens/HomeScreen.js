import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB, Card, Title, Paragraph } from 'react-native-paper';
import { NotesContext } from '../context/NotesContext';

const HomeScreen = ({ navigation }) => {
  const { notes } = useContext(NotesContext);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('NoteDetail', { noteId: item.id })}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph numberOfLines={2}>{item.content}</Paragraph>
          <Paragraph style={styles.date}>
            Last updated: {formatDate(item.updatedAt)}
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      {notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Paragraph style={styles.emptyText}>
            No notes yet. Tap + to add a note.
          </Paragraph>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddNote')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingTop: 10,
  },
  list: {
    padding: 12,
  },
  card: {
    marginBottom: 16,
    marginHorizontal: 8,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    lineHeight: 26,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.7,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c2c2c',
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  }
});

export default HomeScreen;