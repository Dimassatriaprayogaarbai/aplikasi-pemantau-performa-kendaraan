import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles from "./TambahServis.styles";

import { useApp } from "../../context/AppContext";

export default function TambahServisScreen({
  navigation,
}: any) {
  const {
    vehicles,
    addService,
  } = useApp();

  const [kendaraanId, setKendaraanId] =
    useState("");

  const [
    dropdownVisible,
    setDropdownVisible,
  ] = useState(false);

  const [jenisServis, setJenisServis] =
    useState("");

  const [tanggal, setTanggal] =
    useState("");

  const [kilometer, setKilometer] =
    useState("");

  const [biaya, setBiaya] =
    useState("");

  const [catatan, setCatatan] =
    useState("");

  const selectedVehicle =
    vehicles.find(
      (vehicle) =>
        vehicle.id === kendaraanId
    );

  const simpanServis = () => {
    if (
      !kendaraanId ||
      !jenisServis.trim() ||
      !tanggal.trim() ||
      !kilometer.trim()
    ) {
      return;
    }

    addService({
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
              Tambah Servis
            </Text>

            <Text style={styles.subtitle}>
              Catat riwayat servis kendaraan
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
            placeholder="Contoh: Ganti Oli"
            placeholderTextColor="#999999"
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
            placeholder="Contoh: 10/09/2026"
            placeholderTextColor="#999999"
            value={tanggal}
            onChangeText={setTanggal}
          />

          <Text style={styles.label}>
            Kilometer *
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
            Biaya
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: 350000"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            value={biaya}
            onChangeText={setBiaya}
          />

          <Text style={styles.label}>
            Catatan
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            placeholder="Contoh: Ganti oli mesin"
            placeholderTextColor="#999999"
            multiline
            value={catatan}
            onChangeText={setCatatan}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={simpanServis}
          >
            <Text
              style={
                styles.saveButtonText
              }
            >
              Simpan Servis
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