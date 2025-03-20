import { registerRootComponent } from 'expo';

import HomeView from './Views/HomeView';

// registerRootComponent calls AppRegistry.registerComponent('main', () => HomeView);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(HomeView);
