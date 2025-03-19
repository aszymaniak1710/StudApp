import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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

  const addComment = () => {
    if (markerIndex !== null && newComment.trim() !== '') {
      setComments({
        ...comments,
        [markerIndex]: [
          ...(comments[markerIndex] || []),
          `${newComment} ${imageUri ? `\nImage: ${imageUri}` : ''}`,
        ],
      });
      setNewComment('');
      setImageUri(null);
      onClose();
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
});

export default AddCommentModal;
