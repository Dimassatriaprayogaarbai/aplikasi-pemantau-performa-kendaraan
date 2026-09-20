import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "./TambahPengingat.styles";

import { useApp } from "../../context/AppContext";

export default function TambahPengingatScreen({
  navigation,
}: any) {
  const {
    vehicles,
    addReminder,
  } = useApp();

  const [kendaraanId, setKendaraanId] =
    useState("");

  const [dropdownVisible, setDropdownVisible] =
    useState(false);

  const [judul, setJudul] =
    useState("");

  const [kilometerTarget, setKilometerTarget] =
    useState("");

  const [tanggal, setTanggal] =
    useState("");

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [deskripsi, setDeskripsi] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const selectedVehicle =
    vehicles.find(
      (vehicle) =>
        String(vehicle.id) ===
        String(kendaraanId)
    );

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDateDisplay = (
    value: string
  ) => {
    if (!value) {
      return "Pilih tanggal";
    }

    const [year, month, day] =
      value.split("-");

    if (!year || !month || !day) {
      return value;
    }

    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (
    event: any,
    selectedDate?: Date
  ) => {
    if (Platform.OS !== "web") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setTanggal(
        formatDate(selectedDate)
      );
    }
  };

  const simpanPengingat = async () => {
    if (!kendaraanId) {
      Alert.alert(
        "Data belum lengkap",
        "Silakan pilih kendaraan."
      );
      return;
    }

    if (!judul.trim()) {
      Alert.alert(
        "Data belum lengkap",
        "Silakan isi judul pengingat."
      );
      return;
    }

    if (!tanggal) {
      Alert.alert(
        "Data belum lengkap",
        "Silakan pilih tanggal pengingat."
      );
      return;
    }

    try {
      setSaving(true);

      const success = await addReminder({
        kendaraanId,
        judul: judul.trim(),
        tanggal,
        kilometerTarget:
          kilometerTarget.trim()
            ? Number(kilometerTarget)
            : undefined,
        deskripsi:
          deskripsi.trim(),
        status: "aktif",
      });

      if (!success) {
        Alert.alert(
          "Gagal",
          "Pengingat gagal disimpan ke database."
        );
        return;
      }

      navigation.goBack();
    } catch (error) {
      console.error(
        "ERROR SIMPAN PENGINGAT:",
        error
      );

      Alert.alert(
        "Gagal",
        "Terjadi kesalahan saat menyimpan pengingat."
      );
    } finally {
      setSaving(false);
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
                        String(vehicle.id)
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
            value={judul}
            onChangeText={setJudul}
          />

          <Text style={styles.label}>
            Target Kilometer
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: 50000"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            value={kilometerTarget}
            onChangeText={
              setKilometerTarget
            }
          />

          <Text style={styles.label}>
            Tanggal Jatuh Tempo *
          </Text>

          {Platform.OS === "web" ? (
            <View
              style={styles.input}
            >
              {React.createElement(
                "input",
                {
                  type: "date",
                  value: tanggal,
                  onChange: (
                    event: any
                  ) => {
                    setTanggal(
                      event.target.value
                    );
                  },
                  style: {
                    width: "100%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                    backgroundColor:
                      "transparent",
                    fontSize: 16,
                    color: "#222222",
                    fontFamily:
                      "inherit",
                  },
                }
              )}
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.input}
                onPress={() =>
                  setShowDatePicker(
                    true
                  )
                }
              >
                <Text
                  style={
                    tanggal
                      ? styles.dropdownText
                      : styles.dropdownPlaceholder
                  }
                >
                  {formatDateDisplay(
                    tanggal
                  )}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={
                    tanggal
                      ? new Date(
                          `${tanggal}T00:00:00`
                        )
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={
                    handleDateChange
                  }
                />
              )}
            </>
          )}

          <Text style={styles.label}>
            Deskripsi
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                minHeight: 90,
                textAlignVertical:
                  "top",
              },
            ]}
            placeholder="Contoh: Servis rutin dan ganti oli"
            placeholderTextColor="#999999"
            value={deskripsi}
            onChangeText={
              setDeskripsi
            }
            multiline
          />

          <Text style={styles.helperText}>
            Pengingat dapat menggunakan
            target kilometer dan tanggal.
          </Text>

          <TouchableOpacity
            style={[
              styles.saveButton,
              saving && {
                opacity: 0.6,
              },
            ]}
            onPress={simpanPengingat}
            disabled={saving}
          >
            <Text
              style={
                styles.saveButtonText
              }
            >
              {saving
                ? "Menyimpan..."
                : "Simpan Pengingat"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() =>
              navigation.goBack()
            }
            disabled={saving}
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