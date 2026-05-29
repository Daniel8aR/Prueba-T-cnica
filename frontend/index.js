import { registerRootComponent } from 'expo';
import App from './app/App';

// registerRootComponent hace que el componente App sea el principal para toda la aplicación, lo que significa que se renderizará en la pantalla cuando se inicie la aplicación.
registerRootComponent(App);
