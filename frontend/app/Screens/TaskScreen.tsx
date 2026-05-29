// frontend/src/screens/TaskScreen.tsx
import { View, Text, Button, Alert } from 'react-native';
import { Container } from "../../components/Container"; 
import { styles } from '../../styles/styles_main';
import { CustomInput } from '../../components/CustomInput';
import { styles as inputStyles } from "../../styles/inputStyles";
import { useState, useEffect, SetStateAction } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { createTask, updateTask, toggleTask } from '../services/taskService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationParams } from '../../types/navigation';
// Se importa Item del archivo de tipos para su uso en este componente, y se importa data desde un archivo de constantes que contiene las categorías de tareas disponibles.
import { Item } from '../../types/Item';
// Se importa Data desde un archivo de constantes que contiene las categorías de tareas disponibles, que se utilizará para mostrar las opciones en el componente MultipleSelectList.
import { data } from '../../constants/taskCategories';  

// TaskScreen se utiliza para crear o editar una tarea.
export default function TaskScreen ( {navigation}: any ) {
    // useRoute se utiliza para acceder a los parámetros de la ruta actual, en este caso, para obtener la tarea que se va a editar (si existe).
    // NavigationParams es un tipo que define los parámetros que se pueden pasar a las rutas de navegación, y 'Task' es el nombre de la ruta específica para esta pantalla.
    const route = useRoute<RouteProp<NavigationParams, 'Task'>>();
    // task se obtiene de los parámetros de la ruta, y se utiliza para determinar si se está creando una nueva tarea o editando una existente. 
    // Si task es undefined, se asume que se está creando una nueva tarea.
    // El ? se utiliza para manejar el caso en el que route.params pueda ser undefined, evitando errores si no se pasan parámetros a la ruta.
    const task = route.params?.task;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [selected, setSelected] = useState([]);
    const safeAreaInsets = useSafeAreaInsets();

    // useEffect se utiliza para solicitar permisos de ubicación y, si se está editando una tarea existente, 
    // para cargar los datos de la tarea en los campos correspondientes.
    useEffect(() => {
        // 
        ( async () => {
            // Solicita permisos de ubicación al usuario utilizando la API de Location de Expo.
            const { status } = await Location.requestForegroundPermissionsAsync();
            // Si el permiso de ubicación es denegado, se muestra un mensaje en la consola y se detiene la ejecución de esta función.
            if (status !== 'granted') {
                console.log('Permiso de ubicación denegado');
                return;
            }
        })();
        // Si se está editando una tarea existente, se cargan los datos de la tarea en los campos correspondientes.
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setDueDate(task.dueDate || '');
        }
    // El efecto se ejecuta cada vez que cambia el valor de task, lo que permite actualizar los campos si se selecciona una tarea diferente para editar.
    }, [task]);

    // Esta función se llama cuando el usuario presiona el botón para crear o actualizar la tarea.
    // Pero antes de realizar la acción, se muestra una alerta para confirmar si el usuario desea agregar su ubicación a la tarea.
    const confirmLocation = () => {
        Alert.alert(
            "¿Desea agregar su ubicación a esta tarea?",
            "Confirmar ubicación", [
                // Si el usuario selecciona "No", se llama a handleSubmit con el valor false, lo que indica que no se debe agregar la ubicación a la tarea.
                { text: "No", style: "cancel", onPress: () => handleSubmit(false) },
                // Si el usuario selecciona "Sí", se llama a handleSubmit con el valor true, lo que indica que se debe agregar la ubicación a la tarea.
                { text: "Sí", onPress: () => handleSubmit(true) },
            ]
        );
    }

    // Esta función se encarga de manejar la creación o actualización de la tarea, así como la obtención de la ubicación (si el usuario lo confirma) 
    // y el formateo de la fecha de vencimiento.
    const handleSubmit = async (location: boolean) => {
        // Se establecen los valores de latitud y longitud en null inicialmente. 
        // Si el usuario confirma que desea agregar su ubicación, se intenta obtener la ubicación actual utilizando la API de Location de Expo.
        let latitude: number | null = null;
        let longitude: number | null = null;

        // Procede a obtener la ubicación solo si el usuario ha confirmado que desea agregarla a la tarea.
        if (location) {
            try {
                // Se llama a getCurrentPositionAsync para obtener la ubicación actual del dispositivo.
                const loc = await Location.getCurrentPositionAsync({});
                // Posteriormente, se asignan los valores de latitud y longitud a las variables correspondientes utilizando los datos obtenidos de la ubicación.
                latitude = loc.coords.latitude;
                longitude = loc.coords.longitude;
            // Si se produce un error al obtener la ubicación, se captura y se muestra un mensaje en la consola, pero la tarea se crea o actualiza sin la ubicación.
            } catch (error) {
                console.log("No se pudo obtener ubicación:", error);
            }
        }

        // Se formatea la fecha de vencimiento ingresada por el usuario para que esté en el formato esperado por el backend (YYYY-MM-DD).
        let formattedDate = null;
        // Si el usuario ha ingresado una fecha de vencimiento, se procede a formatearla.
        if (dueDate) {
            // Se reemplazan las barras (/) por guiones (-) para facilitar el proceso de división de la fecha en día, mes y año.
            const normalized = dueDate.replace(/\//g, "-"); 
            // Se divide la fecha normalizada en partes utilizando el guion como separador, y se asignan a las variables day, month y year.
            const [day, month, year] = normalized.split('-');
            // Finalmente, se construye la fecha formateada en el formato YYYY-MM-DD utilizando las partes obtenidas.
            formattedDate = `${year}-${month}-${day}`;
        }
        
        // Se crea un objeto information que contiene los datos de la tarea, incluyendo el título, descripción, fecha de vencimiento y ubicación. 
        const information = {
            titulo: title,
            descripcion: description,
            fecha_limite: formattedDate,
            latitud: latitude,
            longitud: longitude,
        };
        
        // Después de crear o actualizar la tarea, se obtiene la respuesta del backend, que incluye el ID de la tarea creada o actualizada.
        let response = (task) ? await updateTask(task.id, information) : await createTask(information);
        
        // Luego, se extraen las claves de las categorías seleccionadas por el usuario usando MultipleSelectList.
        // Se usa map() para iterar sobre los valores seleccionados y encontrar el objeto correspondiente en el array data, obteniendo su clave (key).
        const keys = selected.map(value => {
            // Con item se busca en el array data el objeto que tiene un valor (value) igual al valor seleccionado
            const item = data.find((data: Item) => data.value === value);
            // Si se encuentra el objeto correspondiente, se devuelve su clave (key). Si no se encuentra, se devuelve undefined.
            return item?.key;
        // Finalmente, se filtran el resultado para eliminar cualquier valor undefined, asegurando que solo se obtengan las claves de las categorías seleccionadas que existen en el array data.
        }).filter((key): key is number => key !== undefined);

        // Se llama a toggleTask con el ID de la tarea y las claves de las categorías seleccionadas para asociar las categorías con la tarea en el backend.
        // Sin importar si el array keys está vacío o no, se llama a toggleTask para asegurar que las categorías seleccionadas se actualicen correctamente en el backend
        await toggleTask(response.data.task.id, keys);

        // Finalmente, se navega de regreso a la pantalla principal (Home) después de crear o actualizar la tarea.
        navigation.navigate('Home');
    };

    return (
        <View style= {{ 
                paddingTop: safeAreaInsets.top, 
                paddingBottom: safeAreaInsets.bottom, 
                flex: 1, 
                backgroundColor: '#0c0c0c', 
                justifyContent: 'center',
        }}>
            <Container>
                <Text style={styles.title}>
                    {task ? "Editar Tarea" : "Crear Tarea"}
                </Text>
                <Text>Escriba el nombre de la tarea:</Text>
                <CustomInput
                    style={inputStyles.input}
                    placeholder="Escriba el nombre de la tarea"
                    type="text" 
                    value={title}
                    onChangeText={setTitle}
                    autoCapitalize="sentences"
                />
                <Text>Escriba la descripción de la tarea:</Text>
                <CustomInput
                    style={inputStyles.input}
                    placeholder="Escriba la descripción de la tarea"
                    type="text"
                    value={description}
                    onChangeText={setDescription}
                    autoCapitalize="sentences"
                />
                <Text>Escriba la fecha de vencimiento:</Text>
                <CustomInput
                    style={inputStyles.input}
                    placeholder="DD-MM-YYYY"
                    type="date"
                    value={dueDate}
                    onChangeText={setDueDate}
                    autoCapitalize="none"
                />
                <Text>Escriba los logs relacionados a la tarea:</Text>
                <MultipleSelectList 
                    setSelected={(val: SetStateAction<never[]>) => setSelected(val)} 
                    data={data} 
                    save="value"
                    label="Categories"
                />
                <View style={{ marginTop: 4 }}>
                <Button 
                    color={task ? "#09ab07" : "#0e6cf3"} 
                    title={task ? "Actualizar Tarea" : "Crear Tarea"} 
                    onPress={confirmLocation}
                />
                </View> 
            </Container>
        </View>
    )
}
