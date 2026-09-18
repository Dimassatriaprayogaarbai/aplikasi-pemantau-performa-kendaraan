import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { AppProvider } from "./src/context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
}