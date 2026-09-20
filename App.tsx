import React, { useState } from "react";
import { AppProvider } from "./src/context/AppContext";
import SplashScreen from "./src/screens/Splash/SplashScreen";
import AppNavigation from "./src/navigation/AppNavigation";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AppProvider>
      {showSplash ? (
        <SplashScreen
          onFinish={() => setShowSplash(false)}
        />
      ) : (
        <AppNavigation />
      )}
    </AppProvider>
  );
}