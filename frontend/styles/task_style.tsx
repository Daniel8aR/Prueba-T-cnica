import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 16,
    marginBottom: 8,
  },
  estado: {
    fontSize: 16,
    marginBottom: 4,
  },
  fecha: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  coordenadas: {
    fontSize: 14,
    color: '#777',
  },
  tagsContainer: {
  marginTop: 10,
  flexDirection: 'row',
  flexWrap: 'wrap',
  },
  tagsTitle: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  tag: {
    marginRight: 8,
    fontSize: 14,
  },
});