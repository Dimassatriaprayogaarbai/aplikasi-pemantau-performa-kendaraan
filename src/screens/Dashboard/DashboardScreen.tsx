import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useApp } from "../../context/AppContext";

import styles from "./Dashboard.styles";

export default function DashboardScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] =
    useState(false);

  const navigation = useNavigation<any>();

  const {
    vehicles,
    services,
    reminders,
    fuelRecords,
  } = useApp();

  const today = new Date();

  const dueReminders = reminders.filter((reminder) => {
    const vehicle = vehicles.find(
      (item) =>
        String(item.id) ===
        String(reminder.kendaraanId)
    );

    if (!vehicle) {
      return false;
    }

    const kilometerDue =
      reminder.kilometerTarget !== undefined &&
      reminder.kilometerTarget !== null &&
      vehicle.kilometer >=
        reminder.kilometerTarget;

    const targetDate = new Date(
      `${reminder.tanggal}T00:00:00`
    );

    const dateDue =
      !isNaN(targetDate.getTime()) &&
      today >= targetDate;

    return kilometerDue || dateDue;
  });

  const latestServices = services
    .slice()
    .sort((a, b) => {
      return (
        new Date(b.tanggal).getTime() -
        new Date(a.tanggal).getTime()
      );
    })
    .slice(0, 2);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Halo, Dimas 👋
            </Text>

            <Text style={styles.subtitle}>
              Pantau kondisi kendaraanmu hari ini
            </Text>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() =>
              setNotificationVisible(true)
            }
          >
            <Text style={styles.notificationIcon}>
              🔔
            </Text>

            {dueReminders.length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {dueReminders.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.statContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {vehicles.length}
            </Text>

            <Text style={styles.statLabel}>
              Kendaraan
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {services.length}
            </Text>

            <Text style={styles.statLabel}>
              Total Servis
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Pengingat
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MainTabs", {
                  screen: "Pengingat",
                })
              }
            >
              <Text style={styles.seeAll}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>

          {reminders.length === 0 ? (
            <View style={styles.emptyReminder}>
              <Text style={styles.emptyReminderText}>
                Belum ada pengingat
              </Text>
            </View>
          ) : (
            reminders
              .slice(0, 2)
              .map((reminder) => {
                const vehicle = vehicles.find(
                  (item) =>
                    String(item.id) ===
                    String(reminder.kendaraanId)
                );

                return (
                  <View
                    key={reminder.id}
                    style={styles.reminderCard}
                  >
                    <View style={styles.iconBox}>
                      <Text style={styles.icon}>
                        🔧
                      </Text>
                    </View>

                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>
                        {reminder.judul}
                      </Text>

                      <Text style={styles.cardSubtitle}>
                        {vehicle
                          ? vehicle.namaKendaraan
                          : "Kendaraan"}
                      </Text>

                      <Text style={styles.warningText}>
                        {reminder.kilometerTarget
                          ? `Target ${reminder.kilometerTarget.toLocaleString(
                              "id-ID"
                            )} km`
                          : "Target kilometer belum diatur"}
                      </Text>

                      <Text style={styles.cardSubtitle}>
                        {reminder.tanggal || "-"}
                      </Text>
                    </View>
                  </View>
                );
              })
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Servis Terakhir
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MainTabs", {
                  screen: "Servis",
                })
              }
            >
              <Text style={styles.seeAll}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>

          {latestServices.length === 0 ? (
            <View style={styles.emptyReminder}>
              <Text style={styles.emptyReminderText}>
                Belum ada riwayat servis
              </Text>
            </View>
          ) : (
            latestServices.map((service) => {
              const vehicle = vehicles.find(
                (item) =>
                  String(item.id) ===
                  String(service.kendaraanId)
              );

              return (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceCard}
                  onPress={() =>
                    navigation.navigate(
                      "DetailServis",
                      {
                        serviceId: service.id,
                      }
                    )
                  }
                >
                  <View style={styles.serviceInfo}>
                    <Text style={styles.cardTitle}>
                      {service.jenisServis}
                    </Text>

                    <Text style={styles.cardSubtitle}>
                      {vehicle
                        ? vehicle.namaKendaraan
                        : "Kendaraan"}{" "}
                      • {service.tanggal}
                    </Text>
                  </View>

                  <Text style={styles.price}>
                    Rp
                    {service.biaya.toLocaleString(
                      "id-ID"
                    )}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Pengisian BBM Terakhir
            </Text>
          </View>

          {fuelRecords.length === 0 ? (
            <View style={styles.emptyReminder}>
              <Text style={styles.emptyReminderText}>
                Belum ada data pengisian BBM
              </Text>
            </View>
          ) : (
            fuelRecords
              .slice()
              .reverse()
              .slice(0, 3)
              .map((record) => {
                const vehicle = vehicles.find(
                  (item) =>
                    String(item.id) ===
                    String(record.kendaraanId)
                );

                return (
                  <View
                    key={record.id}
                    style={styles.fuelCard}
                  >
                    <View style={styles.fuelIconBox}>
                      <Text style={styles.fuelIcon}>
                        ⛽
                      </Text>
                    </View>

                    <View style={styles.fuelContent}>
                      <Text style={styles.cardTitle}>
                        {vehicle
                          ? vehicle.namaKendaraan
                          : "Kendaraan"}
                      </Text>

                      <Text style={styles.cardSubtitle}>
                        Odometer{" "}
                        {record.kilometer.toLocaleString(
                          "id-ID"
                        )}{" "}
                        km
                      </Text>

                      <Text style={styles.cardSubtitle}>
                        {record.jumlahLiter.toFixed(
                          2
                        )}{" "}
                        L × Rp
                        {record.hargaPerLiter.toLocaleString(
                          "id-ID"
                        )}
                      </Text>
                    </View>

                    <Text style={styles.fuelPrice}>
                      Rp
                      {record.totalHarga.toLocaleString(
                        "id-ID"
                      )}
                    </Text>
                  </View>
                );
              })
          )}
        </View>
      </ScrollView>

      {menuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate(
                "TambahPengingat"
              );
            }}
          >
            <View style={styles.menuIconBox}>
              <Text style={styles.menuIcon}>
                🔔
              </Text>
            </View>

            <Text style={styles.menuText}>
              Tambah Pengingat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate(
                "TambahServis"
              );
            }}
          >
            <View style={styles.menuIconBox}>
              <Text style={styles.menuIcon}>
                🔧
              </Text>
            </View>

            <Text style={styles.menuText}>
              Tambah Servis
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate(
                "TambahKendaraan"
              );
            }}
          >
            <View style={styles.menuIconBox}>
              <Text style={styles.menuIcon}>
                🚗
              </Text>
            </View>

            <Text style={styles.menuText}>
              Tambah Kendaraan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate(
                "PilihKendaraanBBM"
              );
            }}
          >
            <View style={styles.menuIconBox}>
              <Text style={styles.menuIcon}>
                ⛽
              </Text>
            </View>

            <Text style={styles.menuText}>
              Isi BBM
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          setMenuVisible(!menuVisible)
        }
      >
        <Text style={styles.fabText}>
          {menuVisible ? "×" : "+"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={notificationVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setNotificationVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.notificationModal}>
            <Text style={styles.modalTitle}>
              Peringatan Kendaraan
            </Text>

            {dueReminders.length === 0 ? (
              <View style={styles.noNotification}>
                <Text style={styles.noNotificationIcon}>
                  ✓
                </Text>

                <Text style={styles.noNotificationText}>
                  Tidak ada pengingat yang jatuh tempo
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.modalCategory}>
                  Terlambat
                </Text>

                {dueReminders.map(
                  (reminder, index) => {
                    const vehicle = vehicles.find(
                      (item) =>
                        String(item.id) ===
                        String(reminder.kendaraanId)
                    );

                    const kilometerDue =
                      vehicle &&
                      reminder.kilometerTarget !==
                        undefined &&
                      reminder.kilometerTarget !==
                        null &&
                      vehicle.kilometer >=
                        reminder.kilometerTarget;

                    return (
                      <View
                        key={reminder.id}
                        style={[
                          styles.notificationItem,
                          index <
                            dueReminders.length - 1 &&
                            styles.notificationItemBorder,
                        ]}
                      >
                        <View
                          style={
                            styles.notificationIconBox
                          }
                        >
                          <Text
                            style={
                              styles.notificationItemIcon
                            }
                          >
                            🔧
                          </Text>
                        </View>

                        <View
                          style={
                            styles.notificationItemContent
                          }
                        >
                          <Text
                            style={
                              styles.notificationItemTitle
                            }
                          >
                            {reminder.judul}
                          </Text>

                          <Text
                            style={
                              styles.notificationItemVehicle
                            }
                          >
                            {vehicle
                              ? `${vehicle.namaKendaraan} · ${vehicle.tahun}`
                              : "Kendaraan"}
                          </Text>

                          <Text
                            style={
                              styles.notificationItemWarning
                            }
                          >
                            {kilometerDue
                              ? `Target jarak tercapai · ${
                                  reminder.kilometerTarget
                                    ? reminder.kilometerTarget.toLocaleString(
                                        "id-ID"
                                      )
                                    : "-"
                                } km`
                              : `Tanggal jatuh tempo · ${
                                  reminder.tanggal ||
                                  "-"
                                }`}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                )}
              </>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setNotificationVisible(false)
              }
            >
              <Text style={styles.closeButtonText}>
                Tutup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}