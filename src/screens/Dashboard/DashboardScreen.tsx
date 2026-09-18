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
  const [notificationVisible, setNotificationVisible] = useState(false);

  const navigation = useNavigation<any>();

  const { vehicles, reminders } = useApp();

  const today = new Date();

  const dueReminders = reminders.filter((reminder) => {
    const vehicle = vehicles.find(
      (item) => item.id === reminder.kendaraanId
    );

    if (!vehicle) {
      return false;
    }

    const kilometerDue =
      vehicle.kilometer >= reminder.targetKilometer;

    const [day, month, year] =
      reminder.targetTanggal.split("/").map(Number);

    const targetDate = new Date(
      year,
      month - 1,
      day
    );

    const dateDue = today >= targetDate;

    return kilometerDue || dateDue;
  });

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
              3
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
            reminders.slice(0, 2).map((reminder) => {
              const vehicle = vehicles.find(
                (item) =>
                  item.id === reminder.kendaraanId
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
                      {reminder.jenis}
                    </Text>

                    <Text style={styles.cardSubtitle}>
                      {vehicle
                        ? vehicle.namaKendaraan
                        : "Kendaraan"}
                    </Text>

                    <Text style={styles.warningText}>
                      Target{" "}
                      {reminder.targetKilometer.toLocaleString(
                        "id-ID"
                      )}{" "}
                      km
                    </Text>

                    <Text style={styles.cardSubtitle}>
                      {reminder.targetTanggal}
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

          <View style={styles.serviceCard}>
            <View style={styles.serviceInfo}>
              <Text style={styles.cardTitle}>
                Ganti Oli & Filter
              </Text>

              <Text style={styles.cardSubtitle}>
                Honda Civic • 10 September 2026
              </Text>
            </View>

            <Text style={styles.price}>
              Rp350.000
            </Text>
          </View>

          <View style={styles.serviceCard}>
            <View style={styles.serviceInfo}>
              <Text style={styles.cardTitle}>
                Servis Rem
              </Text>

              <Text style={styles.cardSubtitle}>
                Toyota Avanza • 5 September 2026
              </Text>
            </View>

            <Text style={styles.price}>
              Rp500.000
            </Text>
          </View>
        </View>
      </ScrollView>

      {menuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("TambahPengingat");
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
              navigation.navigate("TambahServis");
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
              navigation.navigate("TambahKendaraan");
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

                {dueReminders.map((reminder, index) => {
                  const vehicle = vehicles.find(
                    (item) =>
                      item.id === reminder.kendaraanId
                  );

                  const kilometerDue =
                    vehicle &&
                    vehicle.kilometer >=
                      reminder.targetKilometer;

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
                      <View style={styles.notificationIconBox}>
                        <Text style={styles.notificationItemIcon}>
                          🔧
                        </Text>
                      </View>

                      <View style={styles.notificationItemContent}>
                        <Text style={styles.notificationItemTitle}>
                          {reminder.jenis}
                        </Text>

                        <Text
                          style={styles.notificationItemVehicle}
                        >
                          {vehicle
                            ? `${vehicle.namaKendaraan} · ${vehicle.tahun}`
                            : "Kendaraan"}
                        </Text>

                        <Text style={styles.notificationItemWarning}>
                          {kilometerDue
                            ? `Target jarak tercapai · ${reminder.targetKilometer.toLocaleString(
                                "id-ID"
                              )} km`
                            : `Tanggal jatuh tempo · ${reminder.targetTanggal}`}
                        </Text>
                      </View>
                    </View>
                  );
                })}
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