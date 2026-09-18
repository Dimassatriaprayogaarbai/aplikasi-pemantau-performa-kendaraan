import React from "react";
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import KendaraanScreen from "../screens/Kendaraan/KendaraanScreen";
import ServisScreen from "../screens/Servis/ServisScreen";
import PengingatScreen from "../screens/Pengingat/PengingatScreen";

import TambahKendaraanScreen from "../screens/Kendaraan/TambahKendaraanScreen";
import DetailKendaraanScreen from "../screens/Kendaraan/DetailKendaraanScreen";
import EditKendaraanScreen from "../screens/Kendaraan/EditKendaraanScreen";

import TambahServisScreen from "../screens/Servis/TambahServisScreen";
import DetailServisScreen from "../screens/Servis/DetailServisScreen";
import EditServisScreen from "../screens/Servis/EditServisScreen";

import TambahPengingatScreen from "../screens/Pengingat/TambahPengingatScreen";
import DetailPengingatScreen from "../screens/Pengingat/DetailPengingatScreen";
import EditPengingatScreen from "../screens/Pengingat/EditPengingatScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F59E0B",
        tabBarInactiveTintColor: "#999999",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Text style={{ fontSize: 20 }}>
              ⌂
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Kendaraan"
        component={KendaraanScreen}
        options={{
          tabBarLabel: "Kendaraan",
          tabBarIcon: () => (
            <Text style={{ fontSize: 20 }}>
              🚗
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Servis"
        component={ServisScreen}
        options={{
          tabBarLabel: "Servis",
          tabBarIcon: () => (
            <Text style={{ fontSize: 20 }}>
              🔧
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Pengingat"
        component={PengingatScreen}
        options={{
          tabBarLabel: "Pengingat",
          tabBarIcon: () => (
            <Text style={{ fontSize: 20 }}>
              🔔
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
        />

        <Stack.Screen
          name="TambahKendaraan"
          component={TambahKendaraanScreen}
        />

        <Stack.Screen
          name="DetailKendaraan"
          component={DetailKendaraanScreen}
        />

        <Stack.Screen
          name="EditKendaraan"
          component={EditKendaraanScreen}
        />

        <Stack.Screen
          name="TambahServis"
          component={TambahServisScreen}
        />

        <Stack.Screen
          name="DetailServis"
          component={DetailServisScreen}
        />

        <Stack.Screen
          name="EditServis"
          component={EditServisScreen}
        />

        <Stack.Screen
          name="TambahPengingat"
          component={TambahPengingatScreen}
        />

        <Stack.Screen
          name="DetailPengingat"
          component={DetailPengingatScreen}
        />

        <Stack.Screen
          name="EditPengingat"
          component={EditPengingatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}