import React, { useEffect, useState } from "react";

import api from "./services/api";

import Repository from "./components/Repository";

import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(
      response => setRepositories(response.data)
    );
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`);
    const newRepositories = repositories.map(repository => {
      if (repository.id === id) {
        return response.data;
      } else {
        return repository;
      };
    });
    setRepositories(newRepositories);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={
            ({ item: repository }) => (
              <Repository
                repository={repository}
                onPress={(id) => handleLikeRepository(id)}
              />
            )
          }
        />

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },

});
