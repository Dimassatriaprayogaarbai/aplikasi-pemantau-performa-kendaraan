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
      item.id ===
      route.params?.serviceId
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
        vehicle.id === kendaraanId
    );

  const simpanPerubahan = () => {
    if (
      !kendaraanId ||
      !jenisServis.trim() ||
      !tanggal.trim() ||
      !kilometer.trim()
    ) {
      return;
    }

    updateService(service.id, {
      kendaraanId,
      jenisServis:
        jenisServis.trim(),
      tanggal: tanggal.trim(),
      kilometer: Number(kilometer),
      biaya: Number(biaya) || 0,
      catatan: catatan.trim(),
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

          <TextInput
            style={styles.input}
            value={tanggal}
            onChangeText={setTanggal}
          />

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