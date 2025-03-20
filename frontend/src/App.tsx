import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import RoutesManager from "./RoutesManager";
import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RoutesManager />
      </PersistGate>
    </Provider>
  );
}

export default App;
