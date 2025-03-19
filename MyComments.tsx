import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage } from 'react-native';

const MyComments = ({ userId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await fetch(`http://your-api-url/api/comments/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchComments();
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  commentItem: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  content: {
    fontSize: 16,
    marginBottom: 5
  },
  date: {
    fontSize: 12,
    color: 'gray'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
});

export default MyComments;