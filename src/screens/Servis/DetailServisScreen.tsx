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

import styles from "./DetailServis.styles";

export default function DetailServisScreen() {
  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const {
    vehicles,
    services,
    deleteService,
  } = useApp();

  const [menuVisible, setMenuVisible] =
    useState(false);

  const service = services.find(
    (item) =>
      item.id ===
      route.params?.serviceId
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
      item.id ===
      service.kendaraanId
  );

  const handleDelete = () => {
    Alert.alert(
      "Hapus Servis",
      `Apakah kamu yakin ingin menghapus riwayat ${service.jenisServis}?`,
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            deleteService(
              service.id
            );

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
              Detail Servis
            </Text>

            <Text style={styles.subtitle}>
              Informasi riwayat servis
            </Text>
          </View>

          <TouchableOpacity
            style={styles.moreButton}
            onPress={() =>
              setMenuVisible(
                !menuVisible
              )
            }
          >
            <Text
              style={
                styles.moreButtonText
              }
            >
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
                  "EditServis",
                  {
                    serviceId:
                      service.id,
                  }
                );
              }}
            >
              <Text style={styles.menuText}>
                Edit Servis
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                handleDelete();
              }}
            >
              <Text
                style={
                  styles.deleteMenuText
                }
              >
                Hapus Servis
              </Text>
            </TouchableOpacity>
          </View>
        )}

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
              {vehicle?.namaKendaraan ||
                "-"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Nomor Polisi
            </Text>

            <Text style={styles.infoValue}>
              {vehicle?.nomorPolisi ||
                "-"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Jenis Servis
            </Text>

            <Text style={styles.infoValue}>
              {service.jenisServis}
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
      </ScrollView>
    </View>
  );
}