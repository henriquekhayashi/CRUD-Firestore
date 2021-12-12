import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateThingScreen from './src/screens/CreateThingScreen';
import ThingDetailScreen from './src/screens/ThingDetailScreen';
import ThingListScreen from './src/screens/ThingListScreen';

const Stack = createStackNavigator();

function MyStack(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="ThingListScreen"
        component={ThingListScreen}
        opotions={{title: "Entry List"}}
      />
      <Stack.Screen
        name="CreateThingScreen"
        component={CreateThingScreen}
        options={{ title: "Create a New Entry" }}
      />
      <Stack.Screen
        name="ThingDetailScreen"
        component={ThingDetailScreen}
        options={{ title: "Entry Detail" }}
      />
    </Stack.Navigator>
    
  )
}

function App(){
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

export default App;