import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const CreateThingScreen = (props) => {
  const initalState = {
    title: "",
    autor: "",
    url: "",
    imgLink: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewBook = async () => {
    if (state.titulo === "") {
      alert("please provide a title");
    } else {

      try {
        await firebase.db.collection("things").add({
          title: state.title,
          autor: state.autor,
          url: state.url,
          imgLink: state.imgLink,
        });

        props.navigation.navigate("ThingListScreen");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Title"
          onChangeText={(value) => handleChangeText(value, "title")}
          value={state.title}
        />
      </View>

      {/* Autor Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Autor"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "autor")}
          value={state.autor}
        />
      </View>

      {/* Url Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Url"
          onChangeText={(value) => handleChangeText(value, "url")}
          value={state.url}
        />
      </View>

      {/* imgLink Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="ImgLink"
          onChangeText={(value) => handleChangeText(value, "imgLink")}
          value={state.imgLink}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save New Entry" onPress={() => saveNewBook()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
});

export default CreateThingScreen;
