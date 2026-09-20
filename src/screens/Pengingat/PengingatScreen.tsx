import React from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useApp } from "../../context/AppContext";

import styles from "./Pengingat.styles";

export default function PengingatScreen() {
  const navigation =
    useNavigation<any>();

  const {
    vehicles,
    reminders,
  } = useApp();

  const today = new Date();

  const getStnkStatus = (
    tanggalStnk: string
  ) => {
    if (!tanggalStnk) {
      return {
        text: "Belum diatur",
        color: "#999999",
      };
    }

    const [
      day,
      month,
      year,
    ] = tanggalStnk
      .split("/")
      .map(Number);

    const targetDate = new Date(
      year,
      month - 1,
      day
    );

    const diffTime =
      targetDate.getTime() -
      today.getTime();

    const daysLeft = Math.ceil(
      diffTime /
        (1000 * 60 * 60 * 24)
    );

    if (daysLeft <= 0) {
      return {
        text: "Jatuh tempo",
        color: "#EF4444",
      };
    }

    if (daysLeft <= 30) {
      return {
        text: `${daysLeft} hari lagi`,
        color: "#EF4444",
      };
    }

    return {
      text: `${daysLeft} hari lagi`,
      color: "#22C55E",
    };
  };

  const getStnkProgress = (
    tanggalStnk: string
  ) => {
    if (!tanggalStnk) {
      return 0;
    }

    const [
      day,
      month,
      year,
    ] = tanggalStnk
      .split("/")
      .map(Number);

    const targetDate = new Date(
      year,
      month - 1,
      day
    );

    const diffTime =
      targetDate.getTime() -
      today.getTime();

    const remainingDays =
      Math.ceil(
        diffTime /
          (1000 * 60 * 60 * 24)
      );

    const progress =
      1 -
      remainingDays / 365;

    return Math.max(
      0,
      Math.min(1, progress)
    );
  };

  const getServiceProgress = (
    currentKm: number,
    targetKm?: number
  ) => {
    if (
      targetKm === undefined ||
      targetKm === null ||
      targetKm <= 0
    ) {
      return 0;
    }

    const progress =
      currentKm / targetKm;

    return Math.max(
      0,
      Math.min(1, progress)
    );
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
          <Text style={styles.title}>
            Pengingat
          </Text>

          <Text style={styles.subtitle}>
            Pantau jadwal perawatan kendaraan
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Pengingat STNK
          </Text>

          {vehicles.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                Belum ada kendaraan
              </Text>
            </View>
          ) : (
            vehicles.map((vehicle) => {
              const stnkStatus =
                getStnkStatus(
                  vehicle.tanggalStnk
                );

              const stnkProgress =
                getStnkProgress(
                  vehicle.tanggalStnk
                );

              return (
                <TouchableOpacity
                  key={vehicle.id}
                  style={styles.reminderCard}
                  onPress={() =>
                    navigation.navigate(
                      "DetailPengingat",
                      {
                        reminderType:
                          "stnk",
                        vehicleId:
                          vehicle.id,
                      }
                    )
                  }
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.iconBox}>
                      <Text style={styles.icon}>
                        📄
                      </Text>
                    </View>

                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>
                        Perpanjang STNK
                      </Text>

                      <Text style={styles.vehicleName}>
                        {vehicle.namaKendaraan}
                      </Text>

                      <Text style={styles.cardDate}>
                        Jatuh tempo:{" "}
                        {vehicle.tanggalStnk ||
                          "Belum diatur"}
                      </Text>
                    </View>
                  </View>

                  {vehicle.tanggalStnk && (
                    <>
                      <View
                        style={
                          styles.progressBackground
                        }
                      >
                        <View
                          style={[
                            styles.progressBar,
                            {
                              width: `${
                                stnkProgress *
                                100
                              }%`,
                              backgroundColor:
                                stnkStatus.color,
                            },
                          ]}
                        />
                      </View>

                      <View
                        style={styles.statusRow}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            {
                              color:
                                stnkStatus.color,
                            },
                          ]}
                        >
                          {stnkStatus.text}
                        </Text>

                        <Text
                          style={styles.plateText}
                        >
                          {vehicle.nomorPolisi}
                        </Text>
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Pengingat Servis
          </Text>

          {reminders.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                Belum ada pengingat servis
              </Text>
            </View>
          ) : (
            reminders.map((reminder) => {
              const vehicle =
                vehicles.find(
                  (item) =>
                    String(item.id) ===
                    String(
                      reminder.kendaraanId
                    )
                );

              if (!vehicle) {
                return null;
              }

              const targetKm =
                reminder.kilometerTarget;

              const hasTargetKm =
                targetKm !== undefined &&
                targetKm !== null &&
                targetKm > 0;

              const progress =
                getServiceProgress(
                  vehicle.kilometer,
                  targetKm
                );

              const isDue =
                hasTargetKm &&
                vehicle.kilometer >=
                  targetKm;

              const isNear =
                hasTargetKm &&
                progress >= 0.8;

              const progressColor =
                isDue || isNear
                  ? "#EF4444"
                  : "#22C55E";

              const statusText =
                !hasTargetKm
                  ? "Pengingat aktif"
                  : isDue
                  ? "Sudah jatuh tempo"
                  : isNear
                  ? "Segera servis"
                  : `${Math.round(
                      progress * 100
                    )}%`;

              return (
                <TouchableOpacity
                  key={reminder.id}
                  style={styles.reminderCard}
                  onPress={() =>
                    navigation.navigate(
                      "DetailPengingat",
                      {
                        reminderId:
                          reminder.id,
                      }
                    )
                  }
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.iconBox}>
                      <Text style={styles.icon}>
                        🔧
                      </Text>
                    </View>

                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>
                        {reminder.judul}
                      </Text>

                      <Text style={styles.vehicleName}>
                        {vehicle.namaKendaraan}
                      </Text>

                      <Text style={styles.cardDate}>
                        Tanggal:{" "}
                        {reminder.tanggal ||
                          "Belum diatur"}
                      </Text>

                      <Text style={styles.cardDate}>
                        Target KM:{" "}
                        {hasTargetKm
                          ? `${targetKm.toLocaleString(
                              "id-ID"
                            )} km`
                          : "Belum diatur"}
                      </Text>
                    </View>
                  </View>

                  {hasTargetKm && (
                    <View
                      style={
                        styles.progressBackground
                      }
                    >
                      <View
                        style={[
                          styles.progressBar,
                          {
                            width: `${
                              progress * 100
                            }%`,
                            backgroundColor:
                              progressColor,
                          },
                        ]}
                      />
                    </View>
                  )}

                  <View style={styles.statusRow}>
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            progressColor,
                        },
                      ]}
                    >
                      {statusText}
                    </Text>

                    <Text
                      style={styles.plateText}
                    >
                      {vehicle.nomorPolisi}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate(
            "TambahPengingat"
          )
        }
      >
        <Text style={styles.fabText}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}