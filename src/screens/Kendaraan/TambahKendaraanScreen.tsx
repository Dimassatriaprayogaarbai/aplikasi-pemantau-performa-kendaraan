import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles from "./TambahKendaraan.styles";
import { useApp } from "../../context/AppContext";

export default function TambahKendaraanScreen({
  navigation,
}: any) {
  const { addVehicle } = useApp();

  const [namaKendaraan, setNamaKendaraan] = useState("");
  const [merek, setMerek] = useState("");
  const [tahun, setTahun] = useState("");
  const [nomorPolisi, setNomorPolisi] = useState("");
  const [kilometer, setKilometer] = useState("");
  const [konsumsiBbm, setKonsumsiBbm] = useState("");
  const [tanggalStnk, setTanggalStnk] = useState("");

  const handleSimpan = () => {
    if (
      !namaKendaraan.trim() ||
      !merek.trim() ||
      !nomorPolisi.trim() ||
      !kilometer.trim()
    ) {
      return;
    }

    addVehicle({
      namaKendaraan: namaKendaraan.trim(),
      merek: merek.trim(),
      tahun: tahun.trim(),
      nomorPolisi: nomorPolisi.trim(),
      kilometer: Number(kilometer),
      konsumsiBbm: konsumsiBbm.trim(),
      tanggalStnk: tanggalStnk.trim(),
    });

    navigation.goBack();
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
            <Text style={styles.backButton}>‹</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>
              Tambah Kendaraan
            </Text>

            <Text style={styles.subtitle}>
              Masukkan data kendaraan
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Nama Kendaraan *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: Honda Civic"
            placeholderTextColor="#999999"
            value={namaKendaraan}
            onChangeText={setNamaKendaraan}
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
            onChangeText={setNomorPolisi}
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
            onChangeText={setKonsumsiBbm}
          />

          <Text style={styles.label}>
            Tanggal Jatuh Tempo STNK
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: 02/10/2026"
            placeholderTextColor="#999999"
            value={tanggalStnk}
            onChangeText={setTanggalStnk}
          />

          <Text style={styles.helperText}>
            Opsional. Digunakan untuk pengingat
            perpanjangan STNK.
          </Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSimpan}
          >
            <Text style={styles.saveButtonText}>
              Simpan Kendaraan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>
              Batal
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}