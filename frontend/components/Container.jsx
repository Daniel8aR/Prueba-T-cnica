// Container.jsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from '../styles/styles_main';

// El componente Container es un componente de presentación que se utiliza para envolver el contenido de las pantallas de la aplicación.
// Acepta dos props: 
// - children: representa el contenido que se va a renderizar dentro del contenedor 
// - scrollable: es un booleano que indica si el contenedor debe ser desplazable o no.
export function Container({ children, scrollable = true } ) {
  return (
    // Si scrollable es true, se renderiza un ScrollView que envuelve el contenido, lo que permite desplazarse si el contenido excede el tamaño de la pantalla.
    scrollable ? (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            { children }
          </View>
        </View>
      </ScrollView>
    // En caso contrario, se renderiza un View simple que envuelve el contenido sin permitir el desplazamiento. 
    // Esto es útil para pantallas donde el contenido no excede el tamaño de la pantalla y no se necesita desplazamiento.
    ) : (
      <View style={styles.containerCard}>
        <View style={styles.innerCard}>
          { children }
        </View>
      </View>
    )
  );
}
export default Container;
