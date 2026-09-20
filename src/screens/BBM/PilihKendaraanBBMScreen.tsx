import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useApp } from "../../context/AppContext";
import styles from "./PilihKendaraanBBM.styles";

export default function PilihKendaraanBBMScreen() {
  const navigation = useNavigation<any>();
  const { vehicles } = useApp();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>‹</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Pilih Kendaraan</Text>
            <Text style={styles.subtitle}>
              Pilih kendaraan untuk mencatat BBM
            </Text>
          </View>
        </View>

        {/* LIST KENDARAAN */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Kendaraan
          </Text>

          <Text style={styles.countText}>
            {vehicles.length}
          </Text>
        </View>

        {vehicles.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🚗</Text>

            <Text style={styles.emptyTitle}>
              Belum ada kendaraan
            </Text>

            <Text style={styles.emptyText}>
              Tambahkan kendaraan terlebih dahulu
              sebelum mencatat pengisian BBM.
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                navigation.navigate("TambahKendaraan")
              }
            >
              <Text style={styles.addButtonText}>
                Tambah Kendaraan
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          vehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={styles.vehicleCard}
              onPress={() =>
                navigation.navigate("CatatBBM", {
                  vehicleId: vehicle.id,
                })
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
                  {vehicle.merek} • {vehicle.nomorPolisi}
                </Text>

                <Text style={styles.vehicleKm}>
                  {vehicle.kilometer.toLocaleString("id-ID")} km
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}