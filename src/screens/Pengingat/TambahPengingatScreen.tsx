import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles from "./TambahPengingat.styles";

import { useApp } from "../../context/AppContext";

export default function TambahPengingatScreen({
  navigation,
}: any) {
  const {
    vehicles,
    addReminder,
  } = useApp();

  const [
    kendaraanId,
    setKendaraanId,
  ] = useState("");

  const [
    dropdownVisible,
    setDropdownVisible,
  ] = useState(false);

  const [
    jenis,
    setJenis,
  ] = useState("");

  const [
    targetKilometer,
    setTargetKilometer,
  ] = useState("");

  const [
    targetTanggal,
    setTargetTanggal,
  ] = useState("");

  const selectedVehicle =
    vehicles.find(
      (vehicle) =>
        vehicle.id === kendaraanId
    );

  const simpanPengingat = () => {
    if (
      !kendaraanId ||
      !jenis.trim()
    ) {
      return;
    }

    addReminder({
      kendaraanId,
      jenis: jenis.trim(),
      targetKilometer:
        Number(targetKilometer) || 0,
      targetTanggal:
        targetTanggal.trim(),
    });

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
              Tambah Pengingat
            </Text>

            <Text style={styles.subtitle}>
              Atur pengingat perawatan kendaraan
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
            placeholder="Contoh: Ganti Oli"
            placeholderTextColor="#999999"
            value={jenis}
            onChangeText={setJenis}
          />

          <Text style={styles.label}>
            Target Kilometer
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: 50000"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            value={targetKilometer}
            onChangeText={
              setTargetKilometer
            }
          />

          <Text style={styles.label}>
            Tanggal Jatuh Tempo
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: 20/09/2026"
            placeholderTextColor="#999999"
            value={targetTanggal}
            onChangeText={
              setTargetTanggal
            }
          />

          <Text style={styles.helperText}>
            Pengingat servis dapat menggunakan
            target kilometer dan tanggal.
          </Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={simpanPengingat}
          >
            <Text
              style={
                styles.saveButtonText
              }
            >
              Simpan Pengingat
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