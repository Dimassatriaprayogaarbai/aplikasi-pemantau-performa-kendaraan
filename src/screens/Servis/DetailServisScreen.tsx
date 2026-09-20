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

import styles from "./DetailServis.styles";

export default function DetailServisScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {
    vehicles,
    services,
    deleteService,
  } = useApp();

  const [deleteModalVisible, setDeleteModalVisible] =
    useState(false);

  const [deleting, setDeleting] = useState(false);

  const service = services.find(
    (item) =>
      String(item.id) ===
      String(route.params?.serviceId)
  );

  if (!service) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          Data servis tidak ditemukan
        </Text>
      </View>
    );
  }

  const vehicle = vehicles.find(
    (item) =>
      String(item.id) ===
      String(service.kendaraanId)
  );

  const handleDelete = () => {
    console.log(
      "TOMBOL HAPUS SERVIS DIKLIK:",
      service.id
    );

    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);

      console.log(
        "MULAI HAPUS SERVIS:",
        service.id
      );

      const berhasil = await deleteService(
        String(service.id)
      );

      console.log(
        "HASIL DELETE SERVIS:",
        berhasil
      );

      if (berhasil) {
        setDeleteModalVisible(false);
        navigation.goBack();
      }
    } catch (error) {
      console.error(
        "ERROR DELETE SERVIS SCREEN:",
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
              Detail Servis
            </Text>

            <Text style={styles.subtitle}>
              Informasi riwayat servis kendaraan
            </Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.bigIcon}>
            <Text style={styles.serviceEmoji}>
              🔧
            </Text>
          </View>

          <Text style={styles.serviceTitle}>
            {service.jenisServis}
          </Text>

          <Text style={styles.vehicleName}>
            {vehicle?.namaKendaraan ||
              "Kendaraan tidak ditemukan"}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>
            Informasi Servis
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Kendaraan
            </Text>

            <Text style={styles.infoValue}>
              {vehicle?.namaKendaraan || "-"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Tanggal
            </Text>

            <Text style={styles.infoValue}>
              {service.tanggal}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Kilometer
            </Text>

            <Text style={styles.infoValue}>
              {service.kilometer.toLocaleString(
                "id-ID"
              )}{" "}
              km
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Biaya
            </Text>

            <Text style={styles.infoValue}>
              Rp{" "}
              {service.biaya.toLocaleString(
                "id-ID"
              )}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Catatan
            </Text>

            <Text style={styles.infoValue}>
              {service.catatan || "-"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 20,
            height: 50,
            borderRadius: 12,
            backgroundColor: "#F59E0B",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate(
              "EditServis",
              {
                serviceId: service.id,
              }
            )
          }
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            Edit Servis
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 10,
            height: 50,
            borderRadius: 12,
            backgroundColor: "#EF4444",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={handleDelete}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            Hapus Servis
          </Text>
        </TouchableOpacity>
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
              Hapus Servis?
            </Text>

            <Text style={styles.modalText}>
              Apakah kamu yakin ingin menghapus
              riwayat "{service.jenisServis}"?
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