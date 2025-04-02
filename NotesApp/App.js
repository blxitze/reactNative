import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NotesProvider } from './context/NotesContext';

import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import NoteDetailScreen from './screens/NoteDetailScreen';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f5f7fa',
    surface: '#ffffff',
    text: '#1e1e1e',
    error: '#b00020',
  },
  roundness: 8,
};

export default function App() {
  return (
    <NotesProvider>
      <PaperProvider theme={theme}>
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