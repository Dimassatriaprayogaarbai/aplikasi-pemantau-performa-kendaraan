import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { useApp } from "../../context/AppContext";

import styles from "./EditPengingat.styles";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditPengingatScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {
    vehicles,
    reminders,
    updateReminder,
  } = useApp();

  const reminder = reminders.find(
    (item) =>
      String(item.id) ===
      String(route.params?.reminderId)
  );

  const [kendaraanId, setKendaraanId] =
    useState("");

  const [dropdownVisible, setDropdownVisible] =
    useState(false);

  const [jenis, setJenis] =
    useState("");

  const [targetKilometer, setTargetKilometer] =
    useState("");

  const [targetTanggal, setTargetTanggal] =
    useState("");

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  useEffect(() => {
    if (!reminder) {
      return;
    }

    setKendaraanId(
      String(reminder.kendaraanId)
    );

    setJenis(
      reminder.judul || ""
    );

    setTargetKilometer(
      reminder.kilometerTarget !==
        undefined &&
      reminder.kilometerTarget !==
        null
        ? String(
            reminder.kilometerTarget
          )
        : ""
    );

    setTargetTanggal(
      reminder.tanggal || ""
    );
  }, [reminder]);

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
        String(vehicle.id) ===
        String(kendaraanId)
    );

  const tanggalToDate = (
    value: string
  ) => {
    if (!value) {
      return new Date();
    }

    if (value.includes("-")) {
      const parts =
        value.split("-");

      if (parts.length === 3) {
        const year =
          Number(parts[0]);

        const month =
          Number(parts[1]);

        const day =
          Number(parts[2]);

        return new Date(
          year,
          month - 1,
          day
        );
      }
    }

    if (value.includes("/")) {
      const parts =
        value.split("/");

      if (parts.length === 3) {
        const day =
          Number(parts[0]);

        const month =
          Number(parts[1]);

        const year =
          Number(parts[2]);

        return new Date(
          year,
          month - 1,
          day
        );
      }
    }

    return new Date();
  };

  const dateToString = (
    date: Date
  ) => {
    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatTanggal = (
    value: string
  ) => {
    if (!value) {
      return "Pilih tanggal";
    }

    if (value.includes("-")) {
      const parts =
        value.split("-");

      if (parts.length === 3) {
        return (
          parts[2] +
          "/" +
          parts[1] +
          "/" +
          parts[0]
        );
      }
    }

    return value;
  };

  const handleDateChange = (
    event: any,
    selectedDate?: Date
  ) => {
    if (Platform.OS !== "web") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setTargetTanggal(
        dateToString(selectedDate)
      );
    }
  };

  const simpanPerubahan =
    async () => {
      if (
        !kendaraanId ||
        !jenis.trim() ||
        !targetTanggal
      ) {
        return;
      }

      const success =
        await updateReminder(
          String(reminder.id),
          {
            kendaraanId:
              String(kendaraanId),

            judul:
              jenis.trim(),

            tanggal:
              targetTanggal,

            kilometerTarget:
              Number(
                targetKilometer
              ) || 0,

            deskripsi:
              reminder.deskripsi || "",

            status:
              reminder.status,
          }
        );

      if (success) {
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

          <View style={styles.headerInfo}>
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

            <Text
              style={
                styles.dropdownArrow
              }
            >
              {dropdownVisible
                ? "⌃"
                : "⌄"}
            </Text>
          </TouchableOpacity>

          {dropdownVisible && (
            <View
              style={
                styles.dropdownList
              }
            >
              {vehicles.map(
                (vehicle) => (
                  <TouchableOpacity
                    key={String(
                      vehicle.id
                    )}
                    style={
                      styles.dropdownItem
                    }
                    onPress={() => {
                      setKendaraanId(
                        String(
                          vehicle.id
                        )
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
                      {vehicle.merek ||
                        "Merek kendaraan"}
                    </Text>

                    <Text
                      style={
                        styles.dropdownItemDetail
                      }
                    >
                      {vehicle.nomorPolisi ||
                        "Nomor polisi belum diatur"}
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
            placeholder="Contoh: Ganti Oli"
            placeholderTextColor="#999999"
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
            placeholder="Contoh: 50000"
            placeholderTextColor="#999999"
          />

          <Text style={styles.label}>
            Tanggal Jatuh Tempo
          </Text>

          {Platform.OS === "web" ? (
            <View
              style={
                styles.dateInputWrapper
              }
            >
              {React.createElement(
                "input",
                {
                  type: "date",
                  value:
                    targetTanggal,

                  onChange: (
                    event: any
                  ) => {
                    setTargetTanggal(
                      event.target.value
                    );
                  },

                  style: {
                    width: "100%",
                    height: 48,
                    border:
                      "1px solid #DDDDDD",
                    borderRadius: 10,
                    padding:
                      "0 12px",
                    fontSize: 16,
                    backgroundColor:
                      "#FFFFFF",
                    color:
                      "#222222",
                    boxSizing:
                      "border-box",
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
                  style={{
                    color:
                      targetTanggal
                        ? "#222222"
                        : "#999999",
                    fontSize: 16,
                  }}
                >
                  {formatTanggal(
                    targetTanggal
                  )}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={tanggalToDate(
                    targetTanggal
                  )}
                  mode="date"
                  display="default"
                  onChange={
                    handleDateChange
                  }
                />
              )}
            </>
          )}

          <Text style={styles.helperText}>
            Pilih tanggal baru jika ingin
            mengubah tanggal pengingat.
          </Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={
              simpanPerubahan
            }
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