import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { useApp } from "../../context/AppContext";

import styles from "./DetailKendaraan.styles";

export default function DetailKendaraanScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {
    vehicles,
    services,
    reminders,
    deleteVehicle,
  } = useApp();

  const [menuVisible, setMenuVisible] = useState(false);

  const vehicle = vehicles.find(
    (item) => item.id === route.params?.vehicleId
  );

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          Kendaraan tidak ditemukan
        </Text>
      </View>
    );
  }

  const vehicleServices = services.filter(
    (item) => item.kendaraanId === vehicle.id
  );

  const vehicleReminders = reminders.filter(
    (item) => item.kendaraanId === vehicle.id
  );

  const handleDelete = () => {
    Alert.alert(
      "Hapus Kendaraan",
      `Apakah kamu yakin ingin menghapus ${vehicle.namaKendaraan}? Data servis dan pengingat kendaraan ini juga akan dihapus.`,
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            deleteVehicle(vehicle.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButton}>
              ‹
            </Text>
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.title}>
              Detail Kendaraan
            </Text>

            <Text style={styles.subtitle}>
              Informasi kendaraan
            </Text>
          </View>

          <TouchableOpacity
            style={styles.moreButton}
            onPress={() =>
              setMenuVisible(!menuVisible)
            }
          >
            <Text style={styles.moreButtonText}>
              ⋮
            </Text>
          </TouchableOpacity>
        </View>

        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);

                navigation.navigate(
                  "EditKendaraan",
                  {
                    vehicleId: vehicle.id,
                  }
                );
              }}
            >
              <Text style={styles.menuText}>
                Edit Kendaraan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                handleDelete();
              }}
            >
              <Text style={styles.deleteMenuText}>
                Hapus Kendaraan
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.mainCard}>
          <View style={styles.bigIcon}>
            <Text style={styles.carEmoji}>
              🚗
            </Text>
          </View>

          <Text style={styles.vehicleName}>
            {vehicle.namaKendaraan}
          </Text>

          <Text style={styles.vehiclePlate}>
            {vehicle.nomorPolisi}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>
            Informasi Kendaraan
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Merek
            </Text>

            <Text style={styles.infoValue}>
              {vehicle.merek}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Tahun
            </Text>

            <Text style={styles.infoValue}>
              {vehicle.tahun || "-"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Nomor Polisi
            </Text>

            <Text style={styles.infoValue}>
              {vehicle.nomorPolisi}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Kilometer
            </Text>

            <Text style={styles.infoValue}>
              {vehicle.kilometer.toLocaleString(
                "id-ID"
              )}{" "}
              km
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Konsumsi BBM
            </Text>

            <Text style={styles.infoValue}>
              {vehicle.konsumsiBbm || "-"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Jatuh Tempo STNK
            </Text>

            <Text style={styles.infoValue}>
              {vehicle.tanggalStnk || "-"}
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Riwayat Servis
            </Text>

            <Text style={styles.countText}>
              {vehicleServices.length}
            </Text>
          </View>

          {vehicleServices.length === 0 ? (
            <Text style={styles.emptyText}>
              Belum ada riwayat servis
            </Text>
          ) : (
            vehicleServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.historyItem}
                onPress={() =>
                  navigation.navigate(
                    "DetailServis",
                    {
                      serviceId: service.id,
                    }
                  )
                }
              >
                <View>
                  <Text style={styles.historyTitle}>
                    {service.jenisServis}
                  </Text>

                  <Text style={styles.historyDetail}>
                    {service.tanggal} •{" "}
                    {service.kilometer.toLocaleString(
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
        </View>

        <View style={styles.infoCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Pengingat
            </Text>

            <Text style={styles.countText}>
              {vehicleReminders.length}
            </Text>
          </View>

          {vehicleReminders.length === 0 ? (
            <Text style={styles.emptyText}>
              Belum ada pengingat
            </Text>
          ) : (
            vehicleReminders.map((reminder) => (
              <TouchableOpacity
                key={reminder.id}
                style={styles.historyItem}
                onPress={() =>
                  navigation.navigate(
                    "DetailPengingat",
                    {
                      reminderId: reminder.id,
                    }
                  )
                }
              >
                <View>
                  <Text style={styles.historyTitle}>
                    {reminder.jenis}
                  </Text>

                  <Text style={styles.historyDetail}>
                    Target{" "}
                    {reminder.targetKilometer.toLocaleString(
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
        </View>
      </ScrollView>
    </View>
  );
}