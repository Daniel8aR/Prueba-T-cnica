import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useImagePicker() {
  // Estado para almacenar la URI de la imagen seleccionada
  const [image, setImage] = useState<string | null>(null);

  // Función para seleccionar una imagen de la galería del dispositivo
  const pickImageFromGallery = async () => {
    // Abrir la galería de imágenes del dispositivo para que el usuario seleccione una imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    // Si el usuario no canceló la selección, se actualiza el estado con la URI de la imagen seleccionada
    if (!result.canceled)
      setImage(result.assets[0].uri);
  };

  // Función para tomar una foto con la cámara del dispositivo
  const takePhotoWithCamera = async () => {
    // Solicitar permisos para acceder a la cámara
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    // Si el permiso no es concedido, se muestra una alerta y se sale de la función
    if (status !== 'granted') {
      Alert.alert('Permiso Denegado', 'Necesitamos acceso a la cámara.');
      return;
    }

    // Abrir la cámara del dispositivo para que el usuario tome una foto
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    // Si el usuario no canceló la selección, se actualiza el estado con la URI de la imagen seleccionada
    if (!result.canceled)
      setImage(result.assets[0].uri);
  };

  return { image, pickImageFromGallery, takePhotoWithCamera, setImage };
}
