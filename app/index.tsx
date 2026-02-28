import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import SearchBar from '../components/searchbar';

const DATA = [
  { id: '1', name: 'Kagurabachi' },
  { id: '2', name: 'Nanatsu no Taizai' },
  { id: '3', name: 'Overlord' },
  { id: '4', name: 'Hitman Reborn' },
];

export default function Home() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleCloseModal = () => {
    setModalVisible(false);
    Alert.alert('Modal Closed', 'Thanks for checking the modal!');
  };

  const handleButtonPress = () => {
    if (userInput.trim()) {
      Alert.alert('Submitted', `You entered: ${userInput}`);
    } else {
      Alert.alert('Oops', 'Please type something first!');
    }
  };

  const renderItem = ({ item }: { item: {id: string, name: string}}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SearchBar />

        <Text style={styles.header}>Home Screen</Text>

        <Image
          source={require('../assets/images/Manga.jpg')}
          style={styles.image}
          resizeMode="cover"
        />

        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />

        <View style={styles.form}>
          <Text style={styles.label}>Favorite anime/manga:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here you favorite anime/manga..."
            value={userInput}
            onChangeText={setUserInput}
          />

          <TouchableOpacity style={styles.touchable} onPress={handleButtonPress}>
            <Text style={styles.touchableText}>Submit</Text>
          </TouchableOpacity>

          <Button
            title="Go to Orders"
            onPress={() => router.push('/Orders')}
          />
        </View>

        <View style={styles.modalTrigger}>
          <Button title="Show Modal" onPress={() => setModalVisible(true)} />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>This is a modal</Text>
              <Button title="Close" onPress={handleCloseModal} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  image: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b0c4de',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  form: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  touchable: {
    backgroundColor: '#4a90e2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  touchableText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalTrigger: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 28,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 24,
  },
});