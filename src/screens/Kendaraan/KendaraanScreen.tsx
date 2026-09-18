import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useApp } from "../../context/AppContext";

import styles from "./Kendaraan.styles";

export default function KendaraanScreen() {
  const navigation =
    useNavigation<any>();

  const { vehicles } = useApp();

  const [
    menuVisible,
    setMenuVisible,
  ] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Kendaraan
            </Text>

            <Text style={styles.subtitle}>
              Kelola dan pantau kendaraanmu
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>
              Total Kendaraan
            </Text>

            <Text style={styles.summaryNumber}>
              {vehicles.length}
            </Text>
          </View>

          <View style={styles.summaryIcon}>
            <Text style={styles.icon}>
              🚗
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Daftar Kendaraan
          </Text>
        </View>

        {vehicles.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              🚗
            </Text>

            <Text style={styles.emptyTitle}>
              Belum ada kendaraan
            </Text>

            <Text style={styles.emptyText}>
              Tambahkan kendaraan terlebih dahulu
            </Text>
          </View>
        ) : (
          vehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={styles.vehicleCard}
              onPress={() =>
                navigation.navigate(
                  "DetailKendaraan",
                  {
                    vehicleId: vehicle.id,
                  }
                )
              }
            >
              <View style={styles.vehicleIcon}>
                <Text style={styles.vehicleEmoji}>
                  🚗
                </Text>
              </View>

              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleName}>
                  {vehicle.namaKendaraan}
                </Text>

                <Text style={styles.vehicleDetail}>
                  {vehicle.merek} •{" "}
                  {vehicle.nomorPolisi}
                </Text>

                <Text style={styles.vehicleKm}>
                  {vehicle.kilometer.toLocaleString(
                    "id-ID"
                  )}{" "}
                  km
                </Text>
              </View>

              <Text style={styles.arrow}>
                ›
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {menuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);

              navigation.navigate(
                "TambahKendaraan"
              );
            }}
          >
            <View style={styles.menuIconBox}>
              <Text style={styles.menuIcon}>
                🚗
              </Text>
            </View>

            <Text style={styles.menuText}>
              Tambah Kendaraan
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          setMenuVisible(!menuVisible)
        }
      >
        <Text style={styles.fabText}>
          {menuVisible ? "×" : "+"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}