import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, Button, StyleSheet } from 'react-native';
import api from '../api'
import { baseUrl } from '../Context/AppVariables';

const SearchComment = ({ visible, onClose, pointId }) => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
useEffect(() => {
  const fetchComments = async () => {
    if (visible && pointId) {
              const Point = {
                id: pointId,
              };
      try {
        const response = await api.post(baseUrl + `/getcommentsforpoint`, Point);

        if (response.status!=200) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const data = response.data;
        const formattedComments = data.map(comment => ({
            id: comment.id,
            text: comment.text,  // Tekst komentarza
            userName: comment.user.username,  // Zakładamy, że użytkownik ma pole "name"
            mark: comment.mark,  // Ocena (Mark) - jeśli masz ENUM, np. "GOOD", "BAD"
            pointId: comment.point.id,  // ID punktu
        }));

        console.log('Sformatowane komentarze:', formattedComments);
        setComments(formattedComments);
        const filteredComments = comments.filter(comment => comment.point.id === pointId);
        //return formattedComments;  // Zwracamy sformatowaną listę komentarzy


      } catch (error) {
        console.error("Błąd pobierania komentarzy:", error);
      }
    }
  };

  fetchComments();
}, [visible, pointId]); // <- Dependency array, aby efekt działał poprawnie

    const renderItem = ({ item }) => (
        <View style={styles.commentContainer}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.commentText}>{item.text}</Text>
            <Text style={styles.commentMark}>{item.mark}</Text>
        </View>
    );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Comments</Text>
          {comments.length === 0 ? (
            <Text style={styles.noComments}>No comments</Text>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          )}
          <Button title="Close" onPress={onClose} />
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
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  author: {
    fontWeight: 'bold',
  },
  comment: {
    marginTop: 5,
  },
});

export default SearchComment;
