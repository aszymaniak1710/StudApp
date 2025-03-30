import { StyleSheet } from 'react-native';

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