import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const ThingDetailScreen = (props) => {
  const initialState = {
    id: "",
    title: "",
    autor: "",
    url: "",
    imgLink: "",
  };

  const [thing, setThing] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setThing({ ...thing, [prop]: value });
  };

  const getThingById = async (id) => {
    const dbRef = firebase.db.collection("things").doc(id);
    const doc = await dbRef.get();
    const thing = doc.data();
    setThing({ ...thing, id: doc.id });
    setLoading(false);
  };

  const deleteThing = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("things")
      .doc(props.route.params.thingId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("ThingListScreen");
  };

  const openConfirmationAlert = () => {
    console.log("is it working?")
    Alert.alert(
      "Removing the Entry",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteThing() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateThing = async () => {
    const thingRef = firebase.db.collection("things").doc(thing.id);
    await thingRef.set({
      title: thing.title,
      autor: thing.autor,
      url: thing.url,
      imgLink: thing.imgLink,
    });
    setThing(initialState);
    props.navigation.navigate("ThingListScreen");
  };

  useEffect(() => {
    getThingById(props.route.params.thingId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Title"
          
          style={styles.inputGroup}
          value={thing.title}
          onChangeText={(value) => handleTextChange(value, "title")}
        />
      </View>
      <View>
        <TextInput
          
          placeholder="Autor"
          style={styles.inputGroup}
          value={thing.autor}
          onChangeText={(value) => handleTextChange(value, "autor")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Url"
          
          style={styles.inputGroup}
          value={thing.url}
          onChangeText={(value) => handleTextChange(value, "url")}
        />
      </View>
      <View>
        <TextInput
          placeholder="imgLink"          
          style={styles.inputGroup}
          value={thing.imgLink}
          onChangeText={(value) => handleTextChange(value, "imgLink")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateThing()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default ThingDetailScreen;
