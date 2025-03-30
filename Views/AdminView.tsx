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
import { baseUrl } from '../Context/AppVariables';
//import {styles} from "../Styles/Style"

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
        Alert.alert("Nie jesteś zalogowany. Żeby dodać komentarze najpierw zaloguj się do swojego konta.");
      }
    };
    fetchToken();
    getUserLocation();
    fetchMarkers();
  }, []);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Zabroniony dostęp do lokalizacji');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  const fetchMarkers = async () => {
    try {
        console.log(baseUrl);
      const response = await api.get(baseUrl + '/admin/extramap');
      const points = response.data;
      console.log("Fetched points:", points);
      const formattedMarkers = points.map((point) => ({
        latitude: parseFloat(point.xcoor),
        longitude: parseFloat(point.ycoor),
        title: `${point.title}`,
        description: point.description || 'No description',
        valid: point.valid,//tu dodac valid do sprawdzania pov
        id: point.id,
      }));
      setMarkers(formattedMarkers);
    } catch (error) {
      console.error('Błąd pobierania punktów:', error);
      Alert.alert('Error', 'Błąd pobrania punktów z serwera.');
    }
  };

  const addMarker = async () => {
    if (!newTitle) {
      Alert.alert("Error", "Tytuł jest wymagany!");
      return;
    }
    if (selectedCoordinates) {
      const newMarker = {
        xcoor: selectedCoordinates.latitude,
        ycoor: selectedCoordinates.longitude,
        title: newTitle,
        description: newDescription || "Brak opisu",
      };
      try {
        const response = await api.post(baseUrl + '/admin/addpoint', newMarker);
        if (response.status === 201) {
          Alert.alert("Success", "Punkt dodany pomyślnie!");
          fetchMarkers();
        } else {
          Alert.alert("Error", "Nieudana próba dodawania punktu.");
        }
      } catch (error) {
        console.error("Błąd dodawania punktu:", error);
        Alert.alert("Error", "Błąd podczas dodawania punktu.");
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
  Alert.alert("Usuń marker", "Jesteś pewien, że chcesz usunąć punkt?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Usuń",
      onPress: async () => {
        try {
          const pointId = markers[markerIndex].id; // Pobieramy tylko ID punktu

          await api.post(`${baseUrl}/admin/deletepoint`, { id: pointId });

          // Usunięcie markera z lokalnego stanu po sukcesie
          setMarkers((prevMarkers) => prevMarkers.filter((_, index) => index !== markerIndex));
        } catch (error) {
          console.error("Błąd usuwania punktu:", error);
        }
      }
    },
  ]);
};



const commitMarker = (markerIndex) =>{
  Alert.alert("Zatwierdź marker", "Jesteś pewien, że chcesz zatwierdzić punkt?", [
     { text: "Cancel", style: "cancel" },
     {
       text: "Zatwierdź",
       onPress: async () => {
         try {
           const pointId = markers[markerIndex].id; // Pobieramy tylko ID punktu

           await api.post(`${baseUrl}/admin/setvalid`, { id: pointId });

           // Zatwierdzenie markera lokalnie
                     setMarkers((prevMarkers) =>
                       prevMarkers.map((marker, index) =>
                         index === markerIndex ? { ...marker, valid: true } : marker
                       )
                     );
         } catch (error) {
           console.error("Błąd zatwierdzanie punktu:", error);
         }
       }
     },
   ]);
 };

  const handleMarkerPress = (markerIndex) => {
      console.log("Selected Marker Index:", markerIndex);
    Alert.alert("Opcje", "Wybierz działanie", [
      { text: "Cancel", style: "cancel" },
      //usuwanie tylko jeśli admin
      { text: "Usuń", onPress: () => removeMarker(markerIndex) },
      { text: "Dodaj komentarz", onPress: () => { setCurrentMarkerIndex(markers[markerIndex].id); setCommentModalVisible(true);
                        console.log("PUNKT Z MAPY");
                        console.log(markerIndex);} },
      { text: "Wyświetl komentarze", onPress: () => { setCurrentMarkerIndex(markers[markerIndex].id);setSearchCommentVisible(true);
              console.log("PUNKT Z MAPY");
              console.log(markerIndex);} },
      //{ text: "Zatwierdź", onPress: () => Marker(markerIndex) },
         ...(markers[markerIndex].valid === false
            ? [{ text: "Zatwierdź", onPress: () => commitMarker(markerIndex) }]
            : []), //pov

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

                 //if (marker.valid === true || (isAdmin && marker.valid === false)) {
                  //       return (
               <Marker
                 key={index}
                 coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                 title={marker.title}
                 description={marker.description}
                 pinColor={marker.valid === false ? "blue" : "red"} /*pov*/
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
               <TextInput style={styles.input} placeholder="Dodaj tytuł (wymagane)" value={newTitle} onChangeText={setNewTitle} />
               <TextInput style={styles.input} placeholder="Dodaj opis" value={newDescription} onChangeText={setNewDescription} />
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
