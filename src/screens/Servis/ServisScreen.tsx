import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useApp } from "../../context/AppContext";

import styles from "./Servis.styles";

export default function ServisScreen() {
  const navigation = useNavigation<any>();

  const {
    vehicles,
    services,
  } = useApp();

  const getVehicle = (kendaraanId: string) => {
    return vehicles.find(
      (vehicle) => vehicle.id === kendaraanId
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            Servis
          </Text>

          <Text style={styles.subtitle}>
            Riwayat dan jadwal servis kendaraan
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>
              Total Riwayat Servis
            </Text>

            <Text style={styles.summaryNumber}>
              {services.length}
            </Text>
          </View>

          <View style={styles.summaryIcon}>
            <Text style={styles.icon}>
              🔧
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Riwayat Servis
          </Text>
        </View>

        {services.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              🔧
            </Text>

            <Text style={styles.emptyTitle}>
              Belum ada riwayat servis
            </Text>

            <Text style={styles.emptyText}>
              Tambahkan data servis kendaraanmu
            </Text>
          </View>
        ) : (
          services.map((service) => {
            const vehicle = getVehicle(
              service.kendaraanId
            );

            if (!vehicle) {
              return null;
            }

            return (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() =>
                  navigation.navigate(
                    "DetailServis",
                    {
                      serviceId: service.id,
                    }
                  )
                }
              >
                <View style={styles.serviceIcon}>
                  <Text style={styles.serviceEmoji}>
                    🔧
                  </Text>
                </View>

                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>
                    {service.jenisServis}
                  </Text>

                  <Text style={styles.vehicleName}>
                    {vehicle.namaKendaraan}
                  </Text>

                  <Text style={styles.serviceDetail}>
                    {service.tanggal} •{" "}
                    {service.kilometer.toLocaleString(
                      "id-ID"
                    )}{" "}
                    km
                  </Text>

                  <Text style={styles.serviceCost}>
                    Rp{" "}
                    {service.biaya.toLocaleString(
                      "id-ID"
                    )}
                  </Text>
                </View>

                <Text style={styles.arrow}>
                  ›
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate("TambahServis")
        }
      >
        <Text style={styles.fabText}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}