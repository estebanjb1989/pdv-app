import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from 'react-redux'
import { getStore } from './redux/Store'
import { initFirebase } from './services/firebase'
import Navigator from './navigator'
import BottomSheet from './component/BottomSheet'

initFirebase()

function App() {
  return (
    <Provider store={getStore()}>
      <Navigator />
      <BottomSheet />
    </Provider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
