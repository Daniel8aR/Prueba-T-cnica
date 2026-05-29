import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { styles } from '../styles/task_style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParams } from '@/types/navigation';
import { deleteTask } from '../app/services/taskService';
import { Container } from './Container';
import { TaskInterface } from '@/types/TaskInterface';

// El componente TaskComponent es un componente funcional que recibe una tarea y una función opcional onDeleted como props.
// El componente muestra los detalles de la tarea, como el título, la descripción, la fecha límite, las coordenadas y las etiquetas.
// puede ser reutilizado multiples veces
const TaskComponent: React.FC<TaskInterface> = ({ task, onDeleted }) => {
  // navagation se utiliza para navegar a la pantalla de modificación de la tarea cuando se presiona el botón "Modificar Tarea".
  // Se inicializa el navigation dentro del componente y no se pasa como prop, ya que el componente TaskComponent no necesita ser consciente de la navegación para funcionar correctamente.
  // Al usar useNavigation dentro del componente, se mantiene la independencia del componente. Lo que hace que el componente sea más reutilizable y fácil de mantener.
  const navigation = useNavigation<NativeStackNavigationProp<NavigationParams>>();

  // deleteTaskHandler es una función asíncrona que se ejecuta cuando se presiona el botón "Eliminar Tarea".
  const deleteTaskHandler = async () => {
    // Esta función llama a deleteTask con el id de la tarea para eliminarla
    const response = await deleteTask(task.id);
    // Si la respuesta es exitosa (status 200) y se ha proporcionado la función onDeleted
    if (response.status === 200 && onDeleted) {
      // Se muestra una alerta de éxito y se llama a onDeleted para que el componente padre pueda actualizar su estado
      Alert.alert('Tarea eliminada', 'La tarea ha sido eliminada exitosamente.');
      onDeleted();
    }
  };

  return (
    // Se utiliza el componente Container para envolver el contenido de la tarea, lo que permite aplicar estilos y diseño de manera consistente en toda la aplicación.
    // El prop scrollable se establece en false para indicar que el contenido dentro del Container no debe ser desplazable.
    <Container scrollable={false}>
      <Text style={styles.titulo}>{task.title}</Text>
      { 
      // Los {} se utilizan para evaluar expresiones JavaScript dentro del JSX. 
      // En este caso, se verifica si task.description existe antes de renderizar el Text que muestra la descripción de la tarea.
      // Si task.description es undefined o null, el bloque de código dentro de los {} no se ejecutará y no se renderizará el Text correspondiente a la descripción.
      }
      {task.description && <Text style={styles.descripcion}>
          <Text style={{ fontWeight: 'bold' }}>Título: </Text>
        {task.description}
      </Text>}
      {task.dueDate && (
        <Text style={styles.fecha}>
          <Text style={{ fontWeight: 'bold' }}>Fecha límite:</Text>
          {new Date(task.dueDate).toLocaleDateString('es-MX' )}
        </Text>
      )}
      {task.latitude && task.longitude && (
        <Text style={styles.coordenadas}>
          <Text style={{ fontWeight: 'bold' }}>Ubicación: </Text>
          {task.latitude}, {task.longitude}
        </Text>
      )}
      {task.tags && task.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {task.tags.map(tag => (
            <Text key={tag.id} style={[styles.tag, { color: tag.color, fontWeight: 'bold' }]}>
              {tag.name}
            </Text>
          ))}
        </View>
      )}
      <View style={{ flexDirection: 'row', marginTop: 2 }}>
      {
        // Se usa un View con flexDirection 'row' para colocar los botones de modificar y eliminar en la misma línea, y se les da un margen para separarlos visualmente.
        // En cada View se coloca un button. En el cual tiene un flex de 1 para que ambos botones ocupen el mismo espacio disponible, 
        // y un marginRight para separar visualmente los botones entre sí.
      }
        <View style={{ flex: 1, marginRight: 10 }}>
          <Button
            color="#0547c2"
            title="Modificar Tarea"
            onPress={() => navigation.navigate('Task', { task })}
          />
        </View>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Button 
            color="#a40606" 
            title="Eliminar Tarea" 
            onPress={ deleteTaskHandler } 
          />
        </View>
      </View>
    </Container>
  );
};

export default TaskComponent;
