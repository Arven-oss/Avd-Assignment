import { StyleSheet, Text, View } from "react-native";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Text>🔍 Search Bar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
});

export default SearchBar;