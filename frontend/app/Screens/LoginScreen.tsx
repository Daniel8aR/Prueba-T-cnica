import { Button, View, Text, Alert } from "react-native";
import { CustomInput } from "../../components/CustomInput";
import { Container } from "../../components/Container";
import { useState } from "react";
import { styles } from "../../styles/styles_main";
import { styles as inputStyles } from "../../styles/inputStyles";
import { login } from "../services/authService";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen( {navigation}: any ) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  // safeAreaInsets() se utiliza para obtener los valores de los bordes seguros del dispositivo, 
  // lo que ayuda a evitar que el contenido se superponga con elementos del sistema como la barra de estado o la barra de navegación. 
  const safeAreaInsets = useSafeAreaInsets();

  // Función asíncrona que maneja el proceso de inicio de sesión. 
  const handleLogin = async () => {
    try {
      // Llama a la función login() del servicio de autenticación con el correo y la contraseña proporcionados por el usuario.
      const data = await login(correo, contrasenia);

      if (data.data.success){
        // console.log("Usuario autenticado:", data.data);
        // console.log("id:", data.data.user.id);
        // console.log("Email:", data.data.user.email);
        // console.log("Name:", data.data.user.name);
        // console.log("Avatar:", data.data.user.avatar);

        // Si el inicio de sesión es exitoso, navega a la pantalla 'Home'.
        navigation.navigate('Home')
      } else Alert.alert('Error al Iniciar Sesión');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style= {{ 
      paddingTop: safeAreaInsets.top, 
      paddingBottom: safeAreaInsets.bottom, 
      flex: 1, 
      backgroundColor: '#0c0c0c', 
      justifyContent: 'center',
    }}>
      <Container>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text>Correo electrónico:</Text>
        <CustomInput
          style={inputStyles.input} 
          placeholder="Escriba su correo electrónico"
          type="email" 
          value={correo} 
          onChangeText={setCorreo}
          autoCapitalize="none"
        />
        <Text>Contraseña:</Text>
        <CustomInput
          style={inputStyles.input}
          placeholder="Escriba su contraseña"
          type="password" 
          value={contrasenia} 
          onChangeText={setContrasenia}
          autoCapitalize="none"
        />
        <Button color="#0e6cf3" title="Iniciar Sesión" onPress={ handleLogin } />
        <Text style={{ paddingTop: 10 }}>
          ¿No tienes una cuenta?{'  '}
          <Text style={{ color: '#0e6cf3' }} onPress={() => navigation.navigate('SignUp')}>
            Registrate
          </Text>
        </Text>
      </Container>
    </View>
  );
}
// 