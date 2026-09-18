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

import styles from "./DetailPengingat.styles";

export default function DetailPengingatScreen() {
  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const {
    vehicles,
    reminders,
    deleteReminder,
  } = useApp();

  const [
    menuVisible,
    setMenuVisible,
  ] = useState(false);

  const reminder =
    reminders.find(
      (item) =>
        item.id ===
        route.params?.reminderId
    );

  const vehicle =
    reminder
      ? vehicles.find(
          (item) =>
            item.id ===
            reminder.kendaraanId
        )
      : vehicles.find(
          (item) =>
            item.id ===
            route.params?.vehicleId
        );

  const isStnk =
    route.params?.reminderType ===
    "stnk";

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

    Alert.alert(
      "Hapus Pengingat",
      `Apakah kamu yakin ingin menghapus pengingat ${reminder.jenis}?`,
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            deleteReminder(
              reminder.id
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
              Detail Pengingat
            </Text>

            <Text style={styles.subtitle}>
              Informasi pengingat kendaraan
            </Text>
          </View>

          {!isStnk && reminder && (
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
          )}
        </View>

        {menuVisible &&
          reminder && (
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);

                  navigation.navigate(
                    "EditPengingat",
                    {
                      reminderId:
                        reminder.id,
                    }
                  );
                }}
              >
                <Text
                  style={styles.menuText}
                >
                  Edit Pengingat
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
                  Hapus Pengingat
                </Text>
              </TouchableOpacity>
            </View>
          )}

        <View style={styles.mainCard}>
          <View style={styles.bigIcon}>
            <Text style={styles.reminderEmoji}>
              {isStnk ? "📄" : "🔧"}
            </Text>
          </View>

          <Text style={styles.reminderTitle}>
            {isStnk
              ? "Perpanjang STNK"
              : reminder?.jenis}
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
              {vehicle.nomorPolisi}
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
                  {reminder?.jenis}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Target Kilometer
                </Text>

                <Text style={styles.infoValue}>
                  {reminder?.targetKilometer.toLocaleString(
                    "id-ID"
                  )}{" "}
                  km
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Target Tanggal
                </Text>

                <Text style={styles.infoValue}>
                  {reminder?.targetTanggal ||
                    "-"}
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
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}