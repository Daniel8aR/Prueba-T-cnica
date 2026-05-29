import React, { useState } from 'react';
import { TextInput, View, KeyboardTypeOptions, TouchableOpacity, Platform } from 'react-native';
import { styles } from '../styles/inputStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Define un tipo para los diferentes tipos de entrada que el componente puede manejar.
type InputType = 'text' | 'email' | 'password' | 'numeric' | 'date';

// Componente de entrada personalizado para manejar diferentes tipos de datos, incluyendo texto, correo electrónico, contraseña, números y fechas.
// onChangeText es una función que se llama cada vez que el texto en el campo de entrada cambia, permitiendo que el componente padre actualice su estado con el nuevo valor.
export function CustomInput({ style, placeholder, type, value, onChangeText, autoCapitalize }: {
  style: any; placeholder: string; type: InputType; value: string; onChangeText: (text: string) => void; autoCapitalize: any;
}) {
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  // showPicker se utiliza para controlar la visibilidad del selector de fecha cuando se desee observar la contrasña, 
  // y se inicializa en false para que el selector esté oculto por defecto.
  const [showPicker, setShowPicker] = useState(false);

  return (
    // Dependiendo del tipo de entrada especificado, se renderiza un TextInput con las propiedades adecuadas. 
    <View style={styles.container}>
      { type === 'password' ? (
        // Si el tipo es 'password', se muestra un TextInput con un botón para mostrar u ocultar la contraseña.
        // <> se utiliza para envolver ambos elementos (TextInput y TouchableOpacity) sin agregar un nodo adicional al DOM.
        <>
          <TextInput
            style={ style }
            placeholder={ placeholder }
            secureTextEntry={ !mostrarContrasenia }
            value={ value }
            onChangeText={ onChangeText }
            placeholderTextColor="#aaa"
            // autoCapitalize se utiliza para controlar si el texto ingresado se capitaliza automáticamente, y se pasa como prop para que el componente padre pueda configurarlo según sea necesario.
            autoCapitalize={ autoCapitalize }
          />
          <TouchableOpacity onPress={() => setMostrarContrasenia(!mostrarContrasenia)}>
            <MaterialCommunityIcons
          // TouchableOpacity se utiliza para crear un botón que, al ser presionado, cambia el estado de mostrarContrasenia, lo que a su vez cambia la propiedad secureTextEntry del TextInput para mostrar u ocultar la contraseña.
          // MaterialCommunityIcons se utiliza para mostrar un ícono de ojo que indica si la contraseña está visible o no, cambiando entre 'eye' y 'eye-off' según el estado de mostrarContrasenia.
              name={mostrarContrasenia ? 'eye-off' : 'eye'}
              // name se establece en 'eye' si mostrarContrasenia es false (contraseña oculta) y en 'eye-off' si mostrarContrasenia es true (contraseña visible).
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </>
      // Si el tipo es 'date', se muestra un TextInput que, al ser presionado, muestra un selector de fecha.
      // El valor del TextInput se formatea como 'dd/mm/yyyy' cuando se selecciona una fecha.
      ) : type === 'date' ? (
        // TouchableOpacity se utiliza para envolver el TextInput, haciendo que al presionar el campo de entrada se muestre el selector de fecha.
        // Al presionar el TextInput, se establece showPicker en true, lo que hace que el componente DateTimePicker se renderice y permita al usuario seleccionar una fecha.
        <>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <TextInput
              style={ style }
              placeholder={ placeholder }
              value={ value }
              editable={ false }
              placeholderTextColor="#aaa"
            />
          </TouchableOpacity>
          { showPicker && (
            // Si showPicker es true, se renderiza el componente DateTimePicker, que permite al usuario seleccionar una fecha.
            <DateTimePicker
              // Si el valor actual es una fecha válida, se establece como la fecha inicial del selector. De lo contrario, se utiliza una nueva fecha (la fecha actual).
              value={value ? new Date(value) : new Date()}
              // mode se establece en 'date' para que el selector solo permita seleccionar fechas (sin horas).
              mode="date"
              // En onChange() se maneja la selección de la fecha. 
              // Cuando el usuario selecciona una fecha, se formatea en el formato 'dd/mm/yyyy' y se llama a onChangeText() para actualizar el valor del TextInput con la fecha seleccionada.
              onChange={(event, selectedDate) => {
                // Después de seleccionar una fecha, se oculta el selector estableciendo showPicker en false.
                setShowPicker(false);
                // Si se ha seleccionado una fecha (selectedDate no es undefined), se formatea la fecha en el formato 'dd/mm/yyyy' y se actualiza el valor del TextInput llamando a onChangeText() con la fecha formateada.
                if (selectedDate) {
                  // Se selecciona el día de la fecha seleccionada, convirtiendolo a una cadena
                  // Con padStart(2, '0') se asegura de que el día siempre tenga dos dígitos, agregando un cero a la izquierda si es necesario (por ejemplo, '01', '02', ..., '31').
                  const day = selectedDate.getDate().toString().padStart(2, '0');
                  // Se selecciona el mes de la fecha seleccionada, convirtiendolo a una cadena
                  const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); 
                  // Se selecciona el año de la fecha seleccionada, convirtiendolo a una cadena
                  const year = selectedDate.getFullYear();
                  // Se construye una cadena en el formato 'dd/mm/yyyy' para mostrar en el TextInput.
                  const formatted = `${day}/${month}/${year}`;
                  onChangeText(formatted);
                }
              }}
            />
          )}
        </>
      ) : (
      // Si no es ninguno de los anteriores, simplemente se ejecuta un TextInput normal con las propiedades correspondientes al tipo de entrada especificado.
        <TextInput
          style={style}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#aaa"
          autoCapitalize={autoCapitalize}
        />
      )}
    </View>
  );
}