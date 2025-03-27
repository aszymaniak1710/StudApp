import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity, Alert, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddCommentModal from '../AddCommentModal';
import SearchComment from './SearchComment';
import { useRoute } from '@react-navigation/native';
import api from "../api";

const OPEN_THRESHOLD = 100;

export default function PointsView() {
  const route = useRoute();
  const { isButtonVisible } = route.params;

  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [comments, setComments] = useState({});
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(null);
  const [searchCommentVisible, setSearchCommentVisible] = useState(false);
  const [jwtToken, setJwtToken] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const translateX = new Animated.Value(-300);

  useEffect(() => {
    const fetchToken = async () => {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      if (jwtToken) {
        setJwtToken(jwtToken);
      } else {
        Alert.alert("You are not logged in. To add comments, please log in to your account first.");
      }
    };
    fetchToken();
    getUserLocation();
    fetchMarkers();
  }, []);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  const fetchMarkers = async () => {
    try {
      const response = await api.get('http://192.168.1.26:8080/map');
      const points = response.data;
      const formattedMarkers = points.map((point) => ({
        latitude: parseFloat(point.xcoor),
        longitude: parseFloat(point.ycoor),
        title: `${point.id}`,
        description: point.description || 'No description',
      }));
      setMarkers(formattedMarkers);
    } catch (error) {
      console.error('Error fetching points:', error);
      Alert.alert('Error', 'Failed to fetch data from server.');
    }
  };

  const addMarker = async () => {
    if (!newTitle) {
      Alert.alert("Error", "Title is required!");
      return;
    }
    if (selectedCoordinates) {
      const newMarker = {
        xcoor: selectedCoordinates.latitude,
        ycoor: selectedCoordinates.longitude,
        title: newTitle,
        description: newDescription || "No description",
      };
      try {
        const response = await api.post('http://192.168.1.26:8080/admin/addpoint', newMarker);
        if (response.status === 201) {
          Alert.alert("Success", "Marker successfully added!");
          fetchMarkers();
        } else {
          Alert.alert("Error", "Failed to add marker.");
        }
      } catch (error) {
        console.error("Error adding marker:", error);
        Alert.alert("Error", "An error occurred while adding the marker.");
      }
      setModalVisible(false);
      setNewTitle('');
      setNewDescription('');
      setSelectedCoordinates(null);
      setIsAddingMarker(false);
    }
  };

  const handleMapPress = (e) => {
    if (isAddingMarker) {
      setSelectedCoordinates(e.nativeEvent.coordinate);
      setModalVisible(true);
    }
  };

  const removeMarker = (markerIndex) => {
    Alert.alert("Delete Marker", "Are you sure you want to delete this marker?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => setMarkers(markers.filter((_, index) => index !== markerIndex)) },
    ]);
  };

  const handleMarkerPress = (markerIndex) => {
    Alert.alert("Marker Options", "Choose an action", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => removeMarker(markerIndex) },
      { text: "Add Comment", onPress: () => { setCurrentMarkerIndex(markerIndex); setCommentModalVisible(true); } },
      { text: "View Comments", onPress: () => { setCurrentMarkerIndex(markerIndex); setSearchCommentVisible(true); } }
    ]);
  };

  const togglePanel = () => {
    const toValue = isPanelOpen ? -300 : 0;
    Animated.spring(translateX, { toValue, useNativeDriver: true }).start();
    setIsPanelOpen(!isPanelOpen);
  };

     return (

       <View style={styles.container}>
         {userLocation ? (
             <MapView
                 style={styles.map}
                 initialRegion={{
                   latitude: userLocation.latitude,
                   longitude: userLocation.longitude,
                   latitudeDelta: 0.0922,
                   longitudeDelta: 0.0421,
                 }}
                 onPress={handleMapPress}
             >
             {markers.map((marker, index) => (
               <Marker
                 key={index}
                 coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                 title={marker.title}
                 description={marker.description}
                 onCalloutPress={() => handleMarkerPress(index)}
               />
             ))}
           </MapView>
         ) : (
           <Text>Loading user location...</Text>
         )}

         {isAddingMarker && (
           <View style={styles.infoBox}>
             <Text style={styles.infoText}>You are in "Add Marker" mode. Click on the map and send suggestion to admin. After submission the marker will be visible for other users.</Text>
           </View>
         )}
     {isButtonVisible &&(
         <TouchableOpacity
           style={[styles.addButton, isAddingMarker ? styles.addButtonActive : {}]}
           onPress={() => setIsAddingMarker(!isAddingMarker)}
         >
           <MaterialCommunityIcons name="plus-circle" size={50} color={isAddingMarker ? 'red' : 'green'} />
         </TouchableOpacity>)}

         <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
           <View style={styles.modalContainer}>
             <View style={styles.modalContent}>
               <TextInput style={styles.input} placeholder="Enter title (required)" value={newTitle} onChangeText={setNewTitle} />
               <TextInput style={styles.input} placeholder="Enter description (optional)" value={newDescription} onChangeText={setNewDescription} />
               <TouchableOpacity onPress={addMarker} style={styles.createButton}><Text style={styles.addButtonText}>Send suggestion to admin</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => { setModalVisible(false); setIsAddingMarker(false); setNewTitle(''); setNewDescription(''); }} style={styles.cancelButton}>
                 <Text style={styles.cancelButtonText}>Cancel</Text>
               </TouchableOpacity>
             </View>
           </View>
         </Modal>

               {/* Add Comment Modal */}
               <AddCommentModal
                 visible={commentModalVisible}
                 onClose={() => setCommentModalVisible(false)}
                 markerIndex={currentMarkerIndex}
                 comments={comments}
                 setComments={setComments}
               />

                 {/* Search Comment Modal */}
                 <SearchComment
                   visible={searchCommentVisible}
                   onClose={() => setSearchCommentVisible(false)}
                   pointId={currentMarkerIndex}
                 />
       </View>
     );
   }


 const styles = StyleSheet.create({
   button: {
     backgroundColor: 'blue',
     padding: 10,
     borderRadius: 5,
   },
   buttonText: {
     color: 'white',
     fontSize: 18,
   },
   panel: {
     position: 'absolute',
     top: 0,
     left: 0,
     bottom: 0,
     width: 250,
     backgroundColor: 'lightblue',
     padding: 20,
     justifyContent: 'center',
   },
   panelText: {
     fontSize: 20,
     marginBottom: 20,
   },
   closeButton: {
     backgroundColor: 'red',
     padding: 10,
     borderRadius: 5,
     alignItems: 'center',
   },
   container: { flex: 1 },
   map: { width: '100%', height: '100%' },
   addButton: { position: 'absolute', bottom: 30, right: 30, backgroundColor: 'white', borderRadius: 50, padding: 10, elevation: 5 },
   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
   modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' },
   input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 10, borderRadius: 5 },
   createButton: { backgroundColor: 'green', padding: 10, borderRadius: 5, alignItems: 'center' },
   addButtonText: { color: 'white', fontWeight: 'bold' },
   infoBox: { position: 'absolute', top: 20, padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 5, width: '90%', alignItems: 'center' },
   infoText: { color: 'white', fontSize: 16 },
   cancelButton: { backgroundColor: '#f44336', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
   cancelButtonText: { color: 'white', fontWeight: 'bold' },
 });