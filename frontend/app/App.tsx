import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ProfileScreen from './Screens/ProfileScreen';
import TaskScreen from './Screens/TaskScreen';

// Crear el stack navigator
// createNativeStackNavigator() es una función que devuelve un objeto con dos componentes: 
// - NavigatorContainer es el contenedor que maneja la navegación
// - Screen es el componente que representa cada pantalla en la navegación.
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // NavigationContainer es el contenedor que maneja la navegación
    // Stack.Navigator es el componente que maneja la navegación entre pantallas
    // Stack.Screen es el componente que representa cada pantalla en la navegación
      // name es el nombre de la pantalla
      // component es el componente que se renderiza cuando se navega a esa pantalla
      // options es un objeto con opciones para esa pantalla 
        // headerShown: false oculta el encabezado de la pantalla
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={ LoginScreen } options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={ SignUpScreen } options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={ HomeScreen } options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ ProfileScreen } options={{ headerShown: false }} />
        <Stack.Screen name="Task" component={ TaskScreen } options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//