import { View, Text, Button, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { notification } from '../services/notification';
import { Container } from "../../components/Container"; 
import { styles } from '@/styles/styles_main';
import { Task } from '../../types/Task';
import TaskComponent from '../../components/TaskComponent';
import { getTasks } from "../services/taskService";

export default function HomeScreen({ navigation }: any) {
  // Estado para almacenar la lista de tareas del usuario.
  const [tasks, setTasks] = useState<Task[]>([]);
  // safeAreaInsets() se utiliza para obtener los valores de los bordes seguros del dispositivo, 
  // lo que ayuda a evitar que el contenido se superponga con elementos del sistema como la barra de estado o la barra de navegación. 
  const safeAreaInsets = useSafeAreaInsets();

  const fetchTasks = async () => {
    // Llama a la función getTasks() del servicio de tareas para obtener la lista de tareas del usuario.
    const response = await getTasks();
    if (response.data) {
      // Mapea la respuesta de la API para crear un array de objetos Task con las propiedades necesarias.
      const tasks = response.data.map((task: any) => ({
        id: task.id,
        title: task.titulo,
        description: task.descripcion,
        completed: task.completada,
        dueDate: task.fecha_limite,
        latitude: task.latitud,
        longitude: task.longitud,
        tags: task.tags?.map((tag: any) => ({
          id: tag.id,
          name: tag.nombre,
          color: tag.color
        }))
      }));
      setTasks(tasks);
    }
  };

  // useFocusEffect se utiliza para ejecutar la función fetchTasks cada vez que la pantalla HomeScreen gana el foco,
  useFocusEffect(
    // useCallback se utiliza para memorizar la función que se pasa a useFocusEffect, evitando que se vuelva a crear en cada renderizado.
    useCallback(
      () => { fetchTasks(); }, []
    )
  );
  
  useEffect(() => {
    if (tasks.length > 0) notification(tasks);
  }, [tasks]);

  return (
    <View style={{ 
      flex: 1, 
      paddingTop: safeAreaInsets.top, 
      paddingBottom: safeAreaInsets.bottom, 
      backgroundColor: '#0c0c0c'
    }}>
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TaskComponent task={item} onDeleted={fetchTasks} />}
      ListHeaderComponent={
        <Container>
          <Text style={styles.title}>Inicio</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Button 
                color="#0547c2" 
                title="Ver Perfil" 
                onPress={() => navigation.navigate('Profile')} 
              />
            </View>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Button 
                color="#09ab07" 
                title="Crear Actividad" 
                onPress={() => navigation.navigate('Task')} 
              />
            </View>
          </View>
        </Container>
      }
    />
    </View>
  );
}
