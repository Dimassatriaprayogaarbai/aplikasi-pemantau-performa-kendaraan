import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { useApp } from "../../context/AppContext";

import styles from "./DetailPengingat.styles";

export default function DetailPengingatScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {
    vehicles,
    reminders,
    deleteReminder,
  } = useApp();

  const [deleteModalVisible, setDeleteModalVisible] =
    useState(false);

  const [deleting, setDeleting] = useState(false);

  const reminder = reminders.find(
    (item) =>
      String(item.id) ===
      String(route.params?.reminderId)
  );

  const vehicle = reminder
    ? vehicles.find(
        (item) =>
          String(item.id) ===
          String(reminder.kendaraanId)
      )
    : vehicles.find(
        (item) =>
          String(item.id) ===
          String(route.params?.vehicleId)
      );

  const isStnk =
    route.params?.reminderType === "stnk";

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          Data kendaraan tidak ditemukan
        </Text>
      </View>
    );
  }

  const handleDelete = () => {
    if (!reminder) {
      return;
    }

    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!reminder) {
      return;
    }

    try {
      setDeleting(true);

      const success = await deleteReminder(
        String(reminder.id)
      );

      if (success) {
        setDeleteModalVisible(false);
        navigation.goBack();
      }
    } catch (error) {
      console.error(
        "ERROR DELETE PENGINGAT:",
        error
      );
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
              Detail Pengingat
            </Text>

            <Text style={styles.subtitle}>
              Informasi pengingat kendaraan
            </Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.bigIcon}>
            <Text style={styles.reminderEmoji}>
              {isStnk ? "📄" : "🔧"}
            </Text>
          </View>

          <Text style={styles.reminderTitle}>
            {isStnk
              ? "Perpanjang STNK"
              : reminder?.judul || "Pengingat"}
          </Text>

          <Text style={styles.vehicleName}>
            {vehicle.namaKendaraan}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>
            Informasi Pengingat
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Kendaraan
            </Text>

            <Text style={styles.infoValue}>
              {vehicle.namaKendaraan}
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

          {isStnk ? (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Jatuh Tempo STNK
              </Text>

              <Text style={styles.infoValue}>
                {vehicle.tanggalStnk ||
                  "Belum diatur"}
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Jenis Pengingat
                </Text>

                <Text style={styles.infoValue}>
                  {reminder?.judul || "-"}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Target Kilometer
                </Text>

                <Text style={styles.infoValue}>
                  {reminder?.kilometerTarget
                    ? reminder.kilometerTarget.toLocaleString(
                        "id-ID"
                      )
                    : "-"}{" "}
                  km
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Target Tanggal
                </Text>

                <Text style={styles.infoValue}>
                  {reminder?.tanggal || "-"}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Kilometer Saat Ini
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
                  Deskripsi
                </Text>

                <Text style={styles.infoValue}>
                  {reminder?.deskripsi || "-"}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Status
                </Text>

                <Text style={styles.infoValue}>
                  {reminder?.status || "-"}
                </Text>
              </View>
            </>
          )}
        </View>

        {!isStnk && reminder && (
          <>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate(
                  "EditPengingat",
                  {
                    reminderId:
                      reminder.id,
                  }
                )
              }
            >
              <Text style={styles.editButtonText}>
                Edit Pengingat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text
                style={styles.deleteButtonText}
              >
                Hapus Pengingat
              </Text>
            </TouchableOpacity>
          </>
        )}
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
              Hapus Pengingat?
            </Text>

            <Text style={styles.modalText}>
              Apakah kamu yakin ingin menghapus
              pengingat "{reminder?.judul}"?
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