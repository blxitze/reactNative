import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { NotesProvider } from './context/NotesContext';

import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import NoteDetailScreen from './screens/NoteDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NotesProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'My Notes' }} 
            />
            <Stack.Screen 
              name="AddNote" 
              component={AddNoteScreen} 
              options={{ title: 'Add Note' }} 
            />
            <Stack.Screen 
              name="NoteDetail" 
              component={NoteDetailScreen} 
              options={{ title: 'Note Details' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </NotesProvider>
  );
}