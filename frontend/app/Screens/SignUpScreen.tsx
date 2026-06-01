// signUp.js File
import { Container } from '@/components/Container';
import React, { useState } from 'react';
import { CustomInput } from "../../components/CustomInput";
import { View, Text, Button, Alert} from 'react-native';
import { styles } from "../../styles/styles_main";
import { styles as inputStyles } from "../../styles/inputStyles";
import { register, login } from "../services/authService";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignUpScreen( {navigation}: any) {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const safeAreaInsets = useSafeAreaInsets();

    const handleSignUp = async () => {
        // Llamar a la función de registro con los datos del formulario
        const data = await register(nombre, correo, contrasenia);
        
        if (data.data.success){
            const data1 = await login(correo, contrasenia);
            if (data1.data.success)
                navigation.navigate('Home')
        } else Alert.alert('Error al Crear Cuenta');
    }

    return (
        <View style={{ paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom, flex: 1, backgroundColor: '#0c0c0c' }}>
            <Container>
                <Text style={styles.title}>Registro</Text>
                <CustomInput
                    style={inputStyles.input}
                    placeholder="Escriba su nombre"
                    type="text" 
                    value={nombre}
                    onChangeText={setNombre}
                    autoCapitalize="sentences"
                />
                <CustomInput
                    style={inputStyles.input}
                    placeholder="Escriba su correo electrónico"
                    type="email"
                    value={correo}
                    onChangeText={setCorreo}
                    autoCapitalize="none"
                />
                <CustomInput
                    style={inputStyles.input}
                    placeholder="Escriba su contraseña"
                    type="password"
                    value={contrasenia}
                    onChangeText={setContrasenia}
                    autoCapitalize="none"
                />
                <Button title="Registrarse" onPress={ handleSignUp } />
                <Text style={{ paddingTop: 10 }}>
                    Ya tienes una cuenta?{'  '}
                    <Text style={{ color: '#0e6cf3' }} onPress={() => navigation.navigate('Login')}>
                        Iniciar Sesión
                    </Text>
                </Text>
            </Container>
        </View>
    );
};

// 