import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { useApp } from "../../context/AppContext";

import styles from "./EditPengingat.styles";

export default function EditPengingatScreen() {
  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const {
    vehicles,
    reminders,
    updateReminder,
  } = useApp();

  const reminder =
    reminders.find(
      (item) =>
        item.id ===
        route.params?.reminderId
    );

  const [
    kendaraanId,
    setKendaraanId,
  ] = useState(
    reminder?.kendaraanId || ""
  );

  const [
    dropdownVisible,
    setDropdownVisible,
  ] = useState(false);

  const [
    jenis,
    setJenis,
  ] = useState(
    reminder?.jenis || ""
  );

  const [
    targetKilometer,
    setTargetKilometer,
  ] = useState(
    reminder
      ? String(
          reminder.targetKilometer
        )
      : ""
  );

  const [
    targetTanggal,
    setTargetTanggal,
  ] = useState(
    reminder?.targetTanggal || ""
  );

  if (!reminder) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          Pengingat tidak ditemukan
        </Text>
      </View>
    );
  }

  const selectedVehicle =
    vehicles.find(
      (vehicle) =>
        vehicle.id === kendaraanId
    );

  const simpanPerubahan = () => {
    if (
      !kendaraanId ||
      !jenis.trim()
    ) {
      return;
    }

    updateReminder(
      reminder.id,
      {
        kendaraanId,
        jenis: jenis.trim(),
        targetKilometer:
          Number(
            targetKilometer
          ) || 0,
        targetTanggal:
          targetTanggal.trim(),
      }
    );

    navigation.goBack();
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

          <View>
            <Text style={styles.title}>
              Edit Pengingat
            </Text>

            <Text style={styles.subtitle}>
              Perbarui pengingat perawatan
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Kendaraan *
          </Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() =>
              setDropdownVisible(
                !dropdownVisible
              )
            }
          >
            <Text
              style={
                selectedVehicle
                  ? styles.dropdownText
                  : styles.dropdownPlaceholder
              }
            >
              {selectedVehicle
                ? selectedVehicle.namaKendaraan
                : "Pilih kendaraan"}
            </Text>

            <Text style={styles.dropdownArrow}>
              {dropdownVisible
                ? "⌃"
                : "⌄"}
            </Text>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdownList}>
              {vehicles.map(
                (vehicle) => (
                  <TouchableOpacity
                    key={vehicle.id}
                    style={
                      styles.dropdownItem
                    }
                    onPress={() => {
                      setKendaraanId(
                        vehicle.id
                      );

                      setDropdownVisible(
                        false
                      );
                    }}
                  >
                    <Text
                      style={
                        styles.dropdownItemName
                      }
                    >
                      {
                        vehicle.namaKendaraan
                      }
                    </Text>

                    <Text
                      style={
                        styles.dropdownItemDetail
                      }
                    >
                      {vehicle.merek} •{" "}
                      {
                        vehicle.nomorPolisi
                      }
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          )}

          <Text style={styles.label}>
            Jenis Pengingat *
          </Text>

          <TextInput
            style={styles.input}
            value={jenis}
            onChangeText={setJenis}
          />

          <Text style={styles.label}>
            Target Kilometer
          </Text>

          <TextInput
            style={styles.input}
            value={targetKilometer}
            onChangeText={
              setTargetKilometer
            }
            keyboardType="numeric"
          />

          <Text style={styles.label}>
            Tanggal Jatuh Tempo
          </Text>

          <TextInput
            style={styles.input}
            value={targetTanggal}
            onChangeText={
              setTargetTanggal
            }
            placeholder="Contoh: 20/09/2026"
            placeholderTextColor="#999999"
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={simpanPerubahan}
          >
            <Text
              style={
                styles.saveButtonText
              }
            >
              Simpan Perubahan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text
              style={
                styles.cancelButtonText
              }
            >
              Batal
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}