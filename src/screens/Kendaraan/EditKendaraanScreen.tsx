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

import styles from "./EditKendaraan.styles";

export default function EditKendaraanScreen() {
  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const {
    vehicles,
    updateVehicle,
  } = useApp();

  const vehicle = vehicles.find(
    (item) =>
      item.id ===
      route.params?.vehicleId
  );

  const [
    namaKendaraan,
    setNamaKendaraan,
  ] = useState(
    vehicle?.namaKendaraan || ""
  );

  const [merek, setMerek] =
    useState(
      vehicle?.merek || ""
    );

  const [tahun, setTahun] =
    useState(
      vehicle?.tahun || ""
    );

  const [
    nomorPolisi,
    setNomorPolisi,
  ] = useState(
    vehicle?.nomorPolisi || ""
  );

  const [
    kilometer,
    setKilometer,
  ] = useState(
    vehicle
      ? String(vehicle.kilometer)
      : ""
  );

  const [
    konsumsiBbm,
    setKonsumsiBbm,
  ] = useState(
    vehicle?.konsumsiBbm || ""
  );

  const [
    tanggalStnk,
    setTanggalStnk,
  ] = useState(
    vehicle?.tanggalStnk || ""
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

  const simpanPerubahan = () => {
    if (
      !namaKendaraan.trim() ||
      !merek.trim() ||
      !nomorPolisi.trim() ||
      !kilometer.trim()
    ) {
      return;
    }

    updateVehicle(
      vehicle.id,
      {
        namaKendaraan:
          namaKendaraan.trim(),

        merek:
          merek.trim(),

        tahun:
          tahun.trim(),

        nomorPolisi:
          nomorPolisi.trim(),

        kilometer:
          Number(kilometer),

        konsumsiBbm:
          konsumsiBbm.trim(),

        tanggalStnk:
          tanggalStnk.trim(),
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
              Edit Kendaraan
            </Text>

            <Text style={styles.subtitle}>
              Perbarui data kendaraan
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Nama Kendaraan *
          </Text>

          <TextInput
            style={styles.input}
            value={namaKendaraan}
            onChangeText={
              setNamaKendaraan
            }
          />

          <Text style={styles.label}>
            Merek *
          </Text>

          <TextInput
            style={styles.input}
            value={merek}
            onChangeText={setMerek}
          />

          <Text style={styles.label}>
            Tahun
          </Text>

          <TextInput
            style={styles.input}
            value={tahun}
            onChangeText={setTahun}
            keyboardType="numeric"
          />

          <Text style={styles.label}>
            Nomor Polisi *
          </Text>

          <TextInput
            style={styles.input}
            value={nomorPolisi}
            onChangeText={
              setNomorPolisi
            }
          />

          <Text style={styles.label}>
            Kilometer Saat Ini *
          </Text>

          <TextInput
            style={styles.input}
            value={kilometer}
            onChangeText={setKilometer}
            keyboardType="numeric"
          />

          <Text style={styles.label}>
            Konsumsi BBM
          </Text>

          <TextInput
            style={styles.input}
            value={konsumsiBbm}
            onChangeText={
              setKonsumsiBbm
            }
          />

          <Text style={styles.label}>
            Tanggal Jatuh Tempo STNK
          </Text>

          <TextInput
            style={styles.input}
            value={tanggalStnk}
            onChangeText={
              setTanggalStnk
            }
            placeholder="Contoh: 20/09/2026"
            placeholderTextColor="#999999"
          />

          <Text style={styles.helperText}>
            Perubahan tanggal STNK akan otomatis
            memengaruhi pengingat STNK.
          </Text>

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