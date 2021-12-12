import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
//import { collection, getDocs } from "firebase/firestore";
import firebase from '../database/firebase';
//import db from '../database/firebase';

const DATA = [
  {
    "name": "Maria",
    "email" : 'maria@site.com',
    "phone" : "-",
    "photo" : "https://randomuser.me/api/portraits/women/16.jpg"
  },
  {
    "name": "Joana",
    "email" : 'joana@site.com',
    "phone" : "--",
    "photo" : "https://randomuser.me/api/portraits/women/25.jpg"
  }
];
/*
const ThingListScreen = (props) => {
  const [users, setUsers] = useState(DATA);

  useEffect(() => {
    const users = [];
    const querySnapshot = getDocs(collection(firebase.db, "things"))
    
    //db.collection("users").onSnapshot((querySnapshot) => {
      
      .then(querySnapshot.forEach((doc) => {
      //querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });
      setUsers(users);
    });
  }, []);
*/

const ThingListScreen = (props) => {
  const [things, setThings] = useState([]);

  useEffect(() => {
    firebase.db.collection("things").onSnapshot((querySnapshot) => {
      const things = [];
      querySnapshot.docs.forEach((doc) => {
        const { title, autor, url, imgLink } = doc.data();
        things.push({
          id: doc.id,
          title,
          autor,
          url,
          imgLink,
        });
      });
      setThings(things);
    });
  }, []);
  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateThingScreen")}
        title="Create New Entry"
      />
      {things.map((thing) => {
        return (
          <ListItem
            key={thing.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("ThingDetailScreen", {
                thingId: thing.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri: thing.imgLink,
              }}
              
            />
            <ListItem.Content>
              <ListItem.Title>{thing.title}</ListItem.Title>
              <ListItem.Subtitle>{thing.autor}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default ThingListScreen;