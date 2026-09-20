import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { useApp } from "../../context/AppContext";

import styles from "./EditServis.styles";

export default function EditServisScreen() {
  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const {
    vehicles,
    services,
    updateService,
  } = useApp();

  const service = services.find(
    (item) =>
      String(item.id) ===
      String(route.params?.serviceId)
  );

  const [
    kendaraanId,
    setKendaraanId,
  ] = useState(
    service?.kendaraanId || ""
  );

  const [
    dropdownVisible,
    setDropdownVisible,
  ] = useState(false);

  const [
    jenisServis,
    setJenisServis,
  ] = useState(
    service?.jenisServis || ""
  );

  const [
    tanggal,
    setTanggal,
  ] = useState(
    service?.tanggal || ""
  );

  const [
    showDatePicker,
    setShowDatePicker,
  ] = useState(false);

  const [
    kilometer,
    setKilometer,
  ] = useState(
    service
      ? String(service.kilometer)
      : ""
  );

  const [
    biaya,
    setBiaya,
  ] = useState(
    service
      ? String(service.biaya)
      : ""
  );

  const [
    catatan,
    setCatatan,
  ] = useState(
    service?.catatan || ""
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

  const selectedVehicle =
    vehicles.find(
      (vehicle) =>
        String(vehicle.id) ===
        String(kendaraanId)
    );

  const getDateValue = () => {
    if (!tanggal) {
      return new Date();
    }

    const parts = tanggal.split("-");

    if (parts.length === 3) {
      const tahun = Number(parts[0]);
      const bulan =
        Number(parts[1]) - 1;
      const hari = Number(parts[2]);

      return new Date(
        tahun,
        bulan,
        hari
      );
    }

    return new Date();
  };

  const handleTanggalChange = (
    event: any,
    selectedDate?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      const hari = String(
        selectedDate.getDate()
      ).padStart(2, "0");

      const bulan = String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0");

      const tahun =
        selectedDate.getFullYear();

      setTanggal(
        `${tahun}-${bulan}-${hari}`
      );
    }
  };

  const getTanggalDisplay = () => {
    if (!tanggal) {
      return "Pilih tanggal servis";
    }

    const bagian = tanggal.split("-");

    if (bagian.length !== 3) {
      return tanggal;
    }

    return `${bagian[2]}/${bagian[1]}/${bagian[0]}`;
  };

  const simpanPerubahan = async () => {
    if (
      !kendaraanId ||
      !jenisServis.trim() ||
      !tanggal ||
      !kilometer.trim()
    ) {
      return;
    }

    const berhasil =
      await updateService(
        service.id,
        {
          kendaraanId,
          jenisServis:
            jenisServis.trim(),
          tanggal,
          kilometer:
            Number(kilometer),
          biaya:
            Number(biaya) || 0,
          catatan:
            catatan.trim(),
        }
      );

    if (berhasil) {
      navigation.goBack();
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

          <View>
            <Text style={styles.title}>
              Edit Servis
            </Text>

            <Text style={styles.subtitle}>
              Perbarui data riwayat servis
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
            Jenis Servis *
          </Text>

          <TextInput
            style={styles.input}
            value={jenisServis}
            onChangeText={
              setJenisServis
            }
          />

          <Text style={styles.label}>
            Tanggal Servis *
          </Text>

          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              setShowDatePicker(true)
            }
          >
            <Text
              style={
                tanggal
                  ? styles.dropdownText
                  : styles.dropdownPlaceholder
              }
            >
              {getTanggalDisplay()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={getDateValue()}
              mode="date"
              display={
                Platform.OS === "ios"
                  ? "spinner"
                  : "default"
              }
              onChange={
                handleTanggalChange
              }
            />
          )}

          <Text style={styles.label}>
            Kilometer *
          </Text>

          <TextInput
            style={styles.input}
            value={kilometer}
            onChangeText={setKilometer}
            keyboardType="numeric"
          />

          <Text style={styles.label}>
            Biaya
          </Text>

          <TextInput
            style={styles.input}
            value={biaya}
            onChangeText={setBiaya}
            keyboardType="numeric"
          />

          <Text style={styles.label}>
            Catatan
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            value={catatan}
            onChangeText={setCatatan}
            multiline
            textAlignVertical="top"
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