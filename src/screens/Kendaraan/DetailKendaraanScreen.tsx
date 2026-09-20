import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
  ActivityIndicator,
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
    fuelRecords,
    deleteVehicle,
  } = useApp();

  const [deleteModalVisible, setDeleteModalVisible] =
    useState(false);

  const [deleting, setDeleting] = useState(false);

  const vehicle = vehicles.find(
    (item) =>
      String(item.id) ===
      String(route.params?.vehicleId)
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
    (item) =>
      String(item.kendaraanId) ===
      String(vehicle.id)
  );

  const vehicleReminders = reminders.filter(
    (item) =>
      String(item.kendaraanId) ===
      String(vehicle.id)
  );

  const vehicleFuelRecords = fuelRecords.filter(
    (item) =>
      String(item.kendaraanId) ===
      String(vehicle.id)
  );

  const handleDelete = () => {
    console.log(
      "TOMBOL HAPUS KENDARAAN DIKLIK:",
      vehicle.id
    );

    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);

      console.log(
        "MULAI HAPUS KENDARAAN:",
        vehicle.id
      );

      const success = await deleteVehicle(
        String(vehicle.id)
      );

      console.log(
        "HASIL DELETE KENDARAAN:",
        success
      );

      if (success) {
        setDeleteModalVisible(false);

        if (Platform.OS === "web") {
          window.alert(
            "Kendaraan berhasil dihapus."
          );
        }

        navigation.goBack();
      } else {
        if (Platform.OS === "web") {
          window.alert(
            "Kendaraan gagal dihapus dari database."
          );
        } else {
          Alert.alert(
            "Gagal",
            "Kendaraan gagal dihapus dari database."
          );
        }
      }
    } catch (error) {
      console.error(
        "ERROR DELETE KENDARAAN:",
        error
      );

      if (Platform.OS === "web") {
        window.alert(
          "Terjadi kesalahan saat menghapus kendaraan."
        );
      } else {
        Alert.alert(
          "Gagal",
          "Terjadi kesalahan saat menghapus kendaraan."
        );
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
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
              Informasi kendaraan dan riwayat
            </Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.bigIcon}>
            <Text style={styles.vehicleEmoji}>
              🚗
            </Text>
          </View>

          <Text style={styles.vehicleTitle}>
            {vehicle.namaKendaraan}
          </Text>

          <Text style={styles.vehicleBrand}>
            {vehicle.merek}
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
              {vehicle.merek || "-"}
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
              {vehicle.nomorPolisi || "-"}
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
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate(
              "EditKendaraan",
              {
                vehicleId:
                  String(vehicle.id),
              }
            )
          }
        >
          <Text style={styles.editButtonText}>
            Edit Kendaraan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>
            Hapus Kendaraan
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Riwayat Servis
          </Text>

          {vehicleServices.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                Belum ada riwayat servis
              </Text>
            </View>
          ) : (
            vehicleServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.dataCard}
                onPress={() =>
                  navigation.navigate(
                    "DetailServis",
                    {
                      serviceId:
                        service.id,
                    }
                  )
                }
              >
                <Text style={styles.dataTitle}>
                  {service.jenisServis}
                </Text>

                <Text style={styles.dataText}>
                  {service.tanggal}
                </Text>

                <Text style={styles.dataText}>
                  {service.kilometer.toLocaleString(
                    "id-ID"
                  )}{" "}
                  km
                </Text>

                <Text style={styles.dataText}>
                  Rp{" "}
                  {Number(
                    service.biaya
                  ).toLocaleString("id-ID")}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Riwayat BBM
          </Text>

          {vehicleFuelRecords.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                Belum ada riwayat BBM
              </Text>
            </View>
          ) : (
            vehicleFuelRecords.map((fuel) => (
              <View
                key={fuel.id}
                style={styles.dataCard}
              >
                <Text style={styles.dataTitle}>
                  {fuel.jenisBbm || "BBM"}
                </Text>

                <Text style={styles.dataText}>
                  {fuel.tanggal}
                </Text>

                <Text style={styles.dataText}>
                  {fuel.jumlahLiter} liter
                </Text>

                <Text style={styles.dataText}>
                  Rp{" "}
                  {Number(
                    fuel.totalHarga
                  ).toLocaleString("id-ID")}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Pengingat
          </Text>

          {vehicleReminders.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                Belum ada pengingat
              </Text>
            </View>
          ) : (
            vehicleReminders.map((reminder) => (
              <View
                key={reminder.id}
                style={styles.dataCard}
              >
                <Text style={styles.dataTitle}>
                  {reminder.judul}
                </Text>

                <Text style={styles.dataText}>
                  {reminder.tanggal}
                </Text>

                <Text style={styles.dataText}>
                  {reminder.deskripsi || "-"}
                </Text>

                <Text style={styles.dataText}>
                  Status: {reminder.status}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() =>
          setDeleteModalVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Hapus Kendaraan?
            </Text>

            <Text style={styles.modalText}>
              Apakah kamu yakin ingin menghapus
              kendaraan "{vehicle.namaKendaraan}"?
              {"\n\n"}
              Data kendaraan beserta data yang
              terkait akan dihapus dari database.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() =>
                  setDeleteModalVisible(false)
                }
                disabled={deleting}
              >
                <Text
                  style={styles.cancelButtonText}
                >
                  Batal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator
                    color="#FFFFFF"
                  />
                ) : (
                  <Text
                    style={
                      styles.confirmButtonText
                    }
                  >
                    Hapus
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}