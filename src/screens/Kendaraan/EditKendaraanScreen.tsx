import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { useRoute } from "@react-navigation/native";

import { useApp } from "../../context/AppContext";

import styles from "./EditKendaraan.styles";

export default function EditKendaraanScreen({
  navigation,
}: any) {
  const route = useRoute<any>();

  const { vehicles, updateVehicle } = useApp();

  const vehicleId = String(
    route.params?.vehicleId
  );

  const vehicle = vehicles.find(
    (item) => String(item.id) === vehicleId
  );

  const [namaKendaraan, setNamaKendaraan] =
    useState("");

  const [merek, setMerek] = useState("");

  const [tahun, setTahun] = useState("");

  const [nomorPolisi, setNomorPolisi] =
    useState("");

  const [kilometer, setKilometer] =
    useState("");

  const [konsumsiBbm, setKonsumsiBbm] =
    useState("");

  const [tanggalStnk, setTanggalStnk] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!vehicle) {
      return;
    }

    setNamaKendaraan(
      vehicle.namaKendaraan || ""
    );

    setMerek(vehicle.merek || "");

    setTahun(vehicle.tahun || "");

    setNomorPolisi(
      vehicle.nomorPolisi || ""
    );

    setKilometer(
      String(vehicle.kilometer || "")
    );

    setKonsumsiBbm(
      vehicle.konsumsiBbm || ""
    );

    setTanggalStnk(
      vehicle.tanggalStnk || ""
    );
  }, [vehicle]);

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <Text style={{ padding: 20 }}>
          Kendaraan tidak ditemukan
        </Text>
      </View>
    );
  }

  const handleSimpan = async () => {
    if (
      !namaKendaraan.trim() ||
      !merek.trim() ||
      !nomorPolisi.trim() ||
      !kilometer.trim()
    ) {
      Alert.alert(
        "Data belum lengkap",
        "Nama kendaraan, merek, nomor polisi, dan kilometer wajib diisi."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3000/api/kendaraan/${vehicleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama_kendaraan:
              namaKendaraan.trim(),

            merk: merek.trim(),

            tipe: "-",

            tahun: tahun.trim()
              ? Number(tahun)
              : null,

            nomor_polisi:
              nomorPolisi.trim(),

            warna: null,

            kilometer:
              Number(kilometer),
          }),
        }
      );

      const data = await response.json();

      console.log(
        "RESPONSE UPDATE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal memperbarui kendaraan"
        );
      }

      updateVehicle(vehicleId, {
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
      });

     Alert.alert(
  "Berhasil",
  "Data kendaraan berhasil diperbarui."
);

navigation.goBack();
    } catch (error: any) {
      console.error(
        "ERROR UPDATE KENDARAAN:",
        error
      );

      Alert.alert(
        "Gagal",
        error.message ||
          "Tidak dapat terhubung ke server."
      );
    } finally {
      setLoading(false);
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
            disabled={loading}
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
              Ubah data kendaraan
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Jenis Kendaraan *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: Mobil"
            placeholderTextColor="#999999"
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
            placeholder="Contoh: Honda"
            placeholderTextColor="#999999"
            value={merek}
            onChangeText={setMerek}
          />

          <Text style={styles.label}>
            Tahun
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: 2020"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            value={tahun}
            onChangeText={setTahun}
          />

          <Text style={styles.label}>
            Nomor Polisi *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: B 1234 ABC"
            placeholderTextColor="#999999"
            value={nomorPolisi}
            onChangeText={
              setNomorPolisi
            }
            autoCapitalize="characters"
          />

          <Text style={styles.label}>
            Kilometer Saat Ini *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: 45000"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            value={kilometer}
            onChangeText={setKilometer}
          />

          <Text style={styles.label}>
            Konsumsi BBM
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: 12 km/l"
            placeholderTextColor="#999999"
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
            placeholder="Contoh: 02/10/2026"
            placeholderTextColor="#999999"
            value={tanggalStnk}
            onChangeText={
              setTanggalStnk
            }
          />

          <Text style={styles.helperText}>
            Opsional. Digunakan untuk
            pengingat perpanjangan STNK.
          </Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSimpan}
            disabled={loading}
          >
            <Text
              style={styles.saveButtonText}
            >
              {loading
                ? "Menyimpan..."
                : "Simpan Perubahan"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() =>
              navigation.goBack()
            }
            disabled={loading}
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