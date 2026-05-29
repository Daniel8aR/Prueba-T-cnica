// styles_main.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5, // Espaciado superior
    paddingBottom: 20, // Espaciado inferior
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  containerCard: {
    flex: 1,
    paddingTop: 5, // Espaciado superior
    paddingBottom: 20, // Espaciado inferior
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  innerContainer: {
    width: '95%', // Ancho relativo
    padding: 15, // Espaciado interno
    backgroundColor: 'white', // Fondo blanco
    borderRadius: 10, // Bordes redondeados
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
  },
  innerCard: {
    width: '90%', // Ancho relativo
    padding: 15, // Espaciado interno
    backgroundColor: 'white', // Fondo blanco
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#0000FF', // Sombra
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    textAlign: 'center', // Texto centrado
    marginBottom: 20,
    color: '#333',
    fontSize: 30,
    fontWeight: 'bold',
  },
});