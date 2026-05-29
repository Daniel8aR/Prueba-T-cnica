// ProfileScreen.tsx File
import { Container } from '@/components/Container';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, Image, Pressable } from 'react-native';
import { styles } from "../../styles/styles_main";
import { styles as textStyles } from "../../styles/textStyles";
import { styles as border } from "../../styles/image_style";
import { logOut, me, uploadAvatar } from "../services/authService";
import { useImagePicker } from '../services/ImagePickerService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen( {navigation}: any) {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const { image, pickImageFromGallery, takePhotoWithCamera } = useImagePicker();
    const safeAreaInsets = useSafeAreaInsets();
    
    // Cargar perfil al montar
    useEffect(() => {
        handleProfile();
    }, []);

    // Subir avatar cuando image cambie
    useEffect(() => {
        if (image) handleUploadAvatar();
    }, [image]);

    // Función para cargar datos del perfil
    const handleProfile = async () => {
        const data = await me();
        if (data.data.success){
            setNombre(data.data.user.name);
            setCorreo(data.data.user.email); 
            setUserId(data.data.user.id);
            setAvatar(data.data.user.avatar);
        } else Alert.alert('Error al cargar los datos del Perfil');
    }

    // Función para cerrar sesión
    const handleLogout = async () => {
        const data = await logOut(); 
        if (data.data.success){
            Alert.alert('Sesión cerrada exitosamente');
            console.log("Message: " + data.data.message);
            navigation.navigate('Login')
        } else Alert.alert('Error al Cerrar Sesión');
    }

    // Función para manejar la seleccionar avatar
    const handleAvatarPick = async () => {
        Alert.alert(
            // Título y mensaje de la alerta
            "Seleccionar imagen",
            // Opciones para el usuario
            "Elige una opción", [
                { text: "Cancelar", style: "cancel" },
                { text: "Galería", onPress: async () => {
                    await pickImageFromGallery();
                }},
                { text: "Cámara", onPress: async () => {                                   
                    await takePhotoWithCamera();
                }},
            ]
        );
    };

    // Función para subir avatar al servidor
    const handleUploadAvatar = async () => {
        if (!image) return;
        
        // Extraer el nombre del archivo y su extensión para determinar el tipo MIME
        const filename = image.split('/').pop() || 'avatar.jpg';
        // Usar una expresión regular para extraer la extensión del archivo
        const match = /\.(\w+)$/.exec(filename);
        // Si no se encuentra una extensión, se asume 'jpg' por defecto
        const ext = match ? match[1].toLowerCase() : 'jpg';
        // Determinar el tipo MIME basado en la extensión del archivo
        const type = ext === 'png' ? 'image/png' : 'image/jpeg';

        // Crear un objeto FormData para enviar el archivo al servidor
        const formData = new FormData();
        // Agregar el archivo de imagen al FormData con la clave 'avatar'
        formData.append('avatar', {
            // El URI del archivo de imagen seleccionado
            uri: image,
            // El tipo MIME del archivo como'image/jpeg' o 'image/png'
            type: type,
            // El nombre del archivo, que se construye como 'avatar.ext' donde 'ext' es la extensión del archivo
            name: `avatar.${ext}`,
        } as any);

        try {
            // Enviar el FormData al servidor utilizando la función uploadAvatar del servicio de autenticación
            const response = await uploadAvatar(formData);
            // Si la respuesta es exitosa, se actualiza el avatar en el estado y se muestra una alerta de éxito
            if (response.data.success) {
                // Actualizar el avatar en el estado con la nueva URL proporcionada por el servidor
                setAvatar(response.data.avatar_url); 
                // Mostrar una alerta de éxito al usuario indicando que el avatar se ha actualizado correctamente 
                Alert.alert("Éxito", "Avatar actualizado.");
            // Si hay un mensaje de error al subir el avatar al servidor, se muestra en una alerta
            } else Alert.alert("Error", "Error al subir avatar");
        } catch (err: any) {
            if (err.response) Alert.alert("Error de validación", err.response.data.message || "Archivo inválido.");
            else Alert.alert("Error de red", "No se pudo conectar con el servidor.");
        }
    };

    return (
        <View style={{ paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom, flex: 1, backgroundColor: '#0c0c0c' }}>
            <Container>
                <Text style={styles.title}>Perfil</Text>
                <Pressable 
                    onPress={ handleAvatarPick }
                    style={({ pressed }) => [
                        border.border,
                        pressed && border.borderPressed
                    ]}
                >
                    <Image
                        source={ avatar ? { uri: avatar } : require('../../assets/images/android.png') }
                        style={ border.image }
                    />
                </Pressable>
                <Text style={textStyles.infoText}>{nombre}</Text>
                <Text style={textStyles.infoText}>{correo}</Text>
                <Button title="Cerrar Sesión "color="#a40606" onPress={ handleLogout } />
            </Container>
        </View>
    );
};

// 