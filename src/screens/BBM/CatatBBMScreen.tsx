import React, {
  useMemo,
  useState,
} from "react";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { useApp } from "../../context/AppContext";

import styles from "./CatatBBM.styles";

export default function CatatBBMScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {
    vehicles,
    addFuelRecord,
  } = useApp();

  const vehicleId =
    route.params?.vehicleId;

  const vehicle = vehicles.find(
    (item) =>
      String(item.id) ===
      String(vehicleId)
  );

  const [hargaPerLiter, setHargaPerLiter] =
    useState("");

  const [totalHarga, setTotalHarga] =
    useState("");

  const [tangkiPenuh, setTangkiPenuh] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const liter = useMemo(() => {
    const harga = Number(
      hargaPerLiter.replace(/\D/g, "")
    );

    const total = Number(
      totalHarga.replace(/\D/g, "")
    );

    if (!harga || !total) {
      return "0.00";
    }

    return (total / harga).toFixed(2);
  }, [
    hargaPerLiter,
    totalHarga,
  ]);

  const formatRupiah = (
    value: string
  ) => {
    const number = Number(
      value.replace(/\D/g, "")
    );

    if (!number) {
      return "";
    }

    return number.toLocaleString(
      "id-ID"
    );
  };

  const handleHargaPerLiter = (
    value: string
  ) => {
    const cleanValue =
      value.replace(/\D/g, "");

    setHargaPerLiter(
      cleanValue
    );
  };

  const handleTotalHarga = (
    value: string
  ) => {
    const cleanValue =
      value.replace(/\D/g, "");

    setTotalHarga(
      cleanValue
    );
  };

  const handleSimpan = async () => {
    if (!vehicle) {
      Alert.alert(
        "Error",
        "Kendaraan tidak ditemukan."
      );
      return;
    }

    if (
      !hargaPerLiter ||
      !totalHarga
    ) {
      Alert.alert(
        "Data belum lengkap",
        "Silakan isi harga per liter dan total harga."
      );
      return;
    }

    const harga =
      Number(hargaPerLiter);

    const total =
      Number(totalHarga);

    const hasilLiter =
      total / harga;

    if (
      harga <= 0 ||
      total <= 0
    ) {
      Alert.alert(
        "Data tidak valid",
        "Harga per liter dan total harga harus lebih dari 0."
      );
      return;
    }

    try {
      setSaving(true);

      const sekarang =
        new Date();

      const tahun =
        sekarang.getFullYear();

      const bulan =
        String(
          sekarang.getMonth() + 1
        ).padStart(2, "0");

      const hari =
        String(
          sekarang.getDate()
        ).padStart(2, "0");

      const tanggal =
        `${tahun}-${bulan}-${hari}`;

      const success =
        await addFuelRecord({
          kendaraanId:
            String(vehicle.id),

          tanggal:

            tanggal,

          jumlahLiter:
            hasilLiter,

          hargaPerLiter:
            harga,

          totalHarga:
            total,

          kilometer:
            Number(
              vehicle.kilometer
            ) || 0,

          jenisBbm:
            "Tidak ditentukan",

          catatan:
            tangkiPenuh
              ? "Pengisian tangki penuh"
              : "",
        });

      if (!success) {
        Alert.alert(
          "Gagal",
          "Data BBM gagal disimpan ke database."
        );
        return;
      }

      Alert.alert(
        "Berhasil",
        "Data pengisian BBM berhasil disimpan.",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error(
        "ERROR SIMPAN BBM:",
        error
      );

      Alert.alert(
        "Gagal",
        "Terjadi kesalahan saat menyimpan data BBM."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!vehicle) {
    return (
      <View
        style={styles.container}
      >
        <View
          style={
            styles.errorContainer
          }
        >
          <Text
            style={
              styles.errorText
            }
          >
            Kendaraan tidak ditemukan
          </Text>

          <TouchableOpacity
            style={
              styles.backButton
            }
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text
              style={
                styles.backButtonText
              }
            >
              Kembali
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <View
        style={styles.header}
      >
        <TouchableOpacity
          style={
            styles.backIconButton
          }
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text
            style={
              styles.backIcon
            }
          >
            ‹
          </Text>
        </TouchableOpacity>

        <Text
          style={
            styles.headerTitle
          }
        >
          Catat Pengisian BBM
        </Text>

        <View
          style={
            styles.headerSpace
          }
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={
            styles.vehicleCard
          }
        >
          <View
            style={
              styles.vehicleIconBox
            }
          >
            <Text
              style={
                styles.vehicleIcon
              }
            >
              🚗
            </Text>
          </View>

          <View
            style={
              styles.vehicleInfo
            }
          >
            <Text
              style={
                styles.vehicleName
              }
            >
              {
                vehicle.namaKendaraan
              }
            </Text>

            <Text
              style={
                styles.vehiclePlate
              }
            >
              {vehicle.merek}
              {" • "}
              {
                vehicle.nomorPolisi
              }
            </Text>
          </View>
        </View>

        <View
          style={
            styles.formSection
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Informasi Pengisian
          </Text>

          <View
            style={
              styles.inputGroup
            }
          >
            <Text
              style={styles.label}
            >
              Odometer
            </Text>

            <View
              style={
                styles.readOnlyInput
              }
            >
              <Text
                style={
                  styles.readOnlyText
                }
              >
                {vehicle.kilometer.toLocaleString(
                  "id-ID"
                )}
              </Text>

              <Text
                style={
                  styles.unitText
                }
              >
                km
              </Text>
            </View>

            <Text
              style={
                styles.helperText
              }
            >
              Odometer diambil dari data kendaraan
            </Text>
          </View>

          <View
            style={
              styles.inputGroup
            }
          >
            <Text
              style={styles.label}
            >
              Harga per Liter
            </Text>

            <View
              style={
                styles.inputWithPrefix
              }
            >
              <Text
                style={
                  styles.prefixText
                }
              >
                Rp
              </Text>

              <TextInput
                style={
                  styles.inputPrefixText
                }
                placeholder="Contoh: 13000"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={formatRupiah(
                  hargaPerLiter
                )}
                onChangeText={
                  handleHargaPerLiter
                }
              />
            </View>
          </View>

          <View
            style={
              styles.inputGroup
            }
          >
            <Text
              style={styles.label}
            >
              Total Harga
            </Text>

            <View
              style={
                styles.inputWithPrefix
              }
            >
              <Text
                style={
                  styles.prefixText
                }
              >
                Rp
              </Text>

              <TextInput
                style={
                  styles.inputPrefixText
                }
                placeholder="Contoh: 100000"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={formatRupiah(
                  totalHarga
                )}
                onChangeText={
                  handleTotalHarga
                }
              />
            </View>
          </View>

          <View
            style={
              styles.inputGroup
            }
          >
            <Text
              style={styles.label}
            >
              Liter
            </Text>

            <View
              style={
                styles.readOnlyInput
              }
            >
              <Text
                style={
                  styles.readOnlyText
                }
              >
                {liter}
              </Text>

              <Text
                style={
                  styles.unitText
                }
              >
                L
              </Text>
            </View>

            <Text
              style={
                styles.helperText
              }
            >
              Liter dihitung otomatis dari total harga ÷ harga per liter
            </Text>
          </View>

          <TouchableOpacity
            style={
              styles.fullTankRow
            }
            onPress={() =>
              setTangkiPenuh(
                !tangkiPenuh
              )
            }
          >
            <View
              style={[
                styles.checkbox,
                tangkiPenuh &&
                  styles.checkboxActive,
              ]}
            >
              {tangkiPenuh && (
                <Text
                  style={
                    styles.checkmark
                  }
                >
                  ✓
                </Text>
              )}
            </View>

            <View
              style={
                styles.fullTankContent
              }
            >
              <Text
                style={
                  styles.fullTankTitle
                }
              >
                Tangki Penuh
              </Text>

              <Text
                style={
                  styles.fullTankSubtitle
                }
              >
                Tandai jika pengisian sampai penuh
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            saving &&
              {
                opacity: 0.6,
              },
          ]}
          onPress={
            handleSimpan
          }
          disabled={saving}
        >
          <Text
            style={
              styles.saveButtonText
            }
          >
            {saving
              ? "Menyimpan..."
              : "Simpan Pengisian"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}