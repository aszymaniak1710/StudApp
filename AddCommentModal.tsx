import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from './Context/AppVariables';
import api from "./api"

interface AddCommentModalProps {
  visible: boolean;
  onClose: () => void;
  markerIndex: number | null;
  comments: { [key: number]: string[] };
  setComments: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({ visible, onClose, markerIndex, comments, setComments }) => {
  const [newComment, setNewComment] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [rating, setRating] = useState(0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

const sendCommentToBackend = async () => {
  if (markerIndex !== null && newComment.trim() !== '') {
    // Mapowanie liczby oceny na string
    const ratingText = ["ONE", "TWO", "THREE", "FOUR", "FIVE"][rating - 1];

    // Przygotowanie danych do wysłania
    const commentData = {
      text: newComment,
      mark: ratingText, // Przesyłamy ocenę jako tekst
      point: { id : markerIndex}, // Id punktu
    };

console.log(commentData);
    try {
      const response = await api.post(baseUrl + '/addcomment', commentData);
      console.log(response)
      if (response.data === 'Comment added') {
        Alert.alert("Success", "Dodano komentarz!");
        // Resetowanie formularza i zamykanie modala
        setNewComment('');
        setRating(0);
        onClose();
      } else {
        Alert.alert("Error", "Błąd dodawania komentarza.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      Alert.alert("Error", "Wykryto błąd przy dodawaniu komentarza.");
    }
  }
};


  const addComment = () => {
    // Dodaj komentarz do stanu
    if (markerIndex !== null && newComment.trim() !== '') {
      setComments({
        ...comments,
        [markerIndex]: [
          ...(comments[markerIndex] || []),
          `${newComment} ${imageUri ? `\nImage: ${imageUri}` : ''} Rating: ${rating}`,
        ],
      });
      // Wyślij dane do backendu
      sendCommentToBackend();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Add comment"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Pick an Image</Text>
          </TouchableOpacity>

          {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

          {/* Ocena: 1-2-3-4-5 */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}></Text>
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.ratingButton,
                  rating === value && styles.selectedRating, // Add selected style if rating matches
                ]}
                onPress={() => setRating(value)}
              >
                <Text style={styles.ratingButtonText}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={addComment} style={styles.createButton}>
            <Text style={styles.addButtonText}>Add Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
          modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          modalContent: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
          },
          input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 10, borderRadius: 5 },
          button: { backgroundColor: 'green', padding: 10, borderRadius: 5, alignItems: 'center' },
          buttonText: { color: 'white' },
          createButton: { backgroundColor: 'green', padding: 10, borderRadius: 5, alignItems: 'center' },
          addButtonText: { color: 'white', fontWeight: 'bold' },
          cancelButton: { backgroundColor: '#f44336', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
          cancelButtonText: { color: 'white', fontWeight: 'bold' },
          imagePreview: { width: 100, height: 100, marginTop: 10, marginBottom: 10, borderRadius: 10 },
          ratingContainer: {
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-around',
            width: '100%',
          },
          ratingText: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          ratingButton: {
            padding: 10,
            backgroundColor: '#ccc',
            borderRadius: 5,
          },
          selectedRating: {
            backgroundColor: 'green',
          },
          ratingButtonText: {
            color: 'white',
            fontWeight: 'bold',
          },
        });
export default AddCommentModal;
