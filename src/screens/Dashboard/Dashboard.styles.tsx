import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },

  header: {
    marginTop: 20,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222222",
  },

  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 6,
  },

  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",

    elevation: 2,

    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  notificationIcon: {
    fontSize: 22,
  },

  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  notificationBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  statContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,

    elevation: 2,

    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F59E0B",
  },

  statLabel: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
  },

  section: {
    marginBottom: 25,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222222",
  },

  seeAll: {
    fontSize: 13,
    color: "#F59E0B",
    fontWeight: "600",
  },

  reminderCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 15,

    marginBottom: 10,

    elevation: 2,

    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  iconBox: {
    width: 48,
    height: 48,

    borderRadius: 12,

    backgroundColor: "#FFF4D6",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 13,
  },

  icon: {
    fontSize: 22,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#777777",
    marginTop: 4,
  },

  warningText: {
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "600",
    marginTop: 5,
  },

  emptyReminder: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 25,
    alignItems: "center",
    justifyContent: "center",

    elevation: 2,

    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  emptyReminderText: {
    fontSize: 14,
    color: "#999999",
  },

  serviceCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 16,

    marginBottom: 10,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    elevation: 2,

    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  serviceInfo: {
    flex: 1,
  },

  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333333",

    marginLeft: 10,
  },

  fab: {
    position: "absolute",

    right: 20,
    bottom: 25,

    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: "#F59E0B",

    justifyContent: "center",
    alignItems: "center",

    elevation: 6,

    shadowOpacity: 0.2,
    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  fabText: {
    color: "#FFFFFF",

    fontSize: 32,

    fontWeight: "400",

    lineHeight: 34,
  },

  menuContainer: {
    position: "absolute",

    right: 20,
    bottom: 95,

    width: 230,

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 10,

    elevation: 8,

    shadowOpacity: 0.15,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  menuItem: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 8,

    paddingHorizontal: 5,

    marginBottom: 3,
  },

  menuIconBox: {
    width: 40,
    height: 40,

    borderRadius: 11,

    backgroundColor: "#FFF4D6",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  menuIcon: {
    fontSize: 19,
  },

  menuText: {
    fontSize: 14,

    fontWeight: "600",

    color: "#333333",
  },

  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
},

notificationModal: {
  width: "100%",
  maxWidth: 600,
  backgroundColor: "#FFFFFF",
  borderRadius: 24,
  padding: 25,
  elevation: 10,
},

modalTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#222222",
  marginBottom: 28,
},

modalCategory: {
  fontSize: 16,
  fontWeight: "700",
  color: "#EF4444",
  marginBottom: 12,
},

notificationItem: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 14,
},

notificationItemBorder: {
  borderBottomWidth: 1,
  borderBottomColor: "#E5E5E5",
},

notificationIconBox: {
  width: 48,
  height: 48,
  borderRadius: 12,
  backgroundColor: "#FFF0F0",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 13,
},

notificationItemIcon: {
  fontSize: 22,
},

notificationItemContent: {
  flex: 1,
},

notificationItemTitle: {
  fontSize: 17,
  fontWeight: "700",
  color: "#222222",
},

notificationItemVehicle: {
  fontSize: 14,
  color: "#777777",
  marginTop: 3,
},

notificationItemWarning: {
  fontSize: 13,
  color: "#EF4444",
  fontWeight: "600",
  marginTop: 5,
},

noNotification: {
  alignItems: "center",
  paddingVertical: 30,
},

noNotificationIcon: {
  fontSize: 35,
  color: "#22C55E",
  marginBottom: 10,
},

noNotificationText: {
  fontSize: 14,
  color: "#777777",
  textAlign: "center",
},

closeButton: {
  alignSelf: "flex-end",
  marginTop: 20,
  paddingHorizontal: 15,
  paddingVertical: 8,
},

closeButtonText: {
  fontSize: 16,
  fontWeight: "700",
  color: "#F59E0B",
},

fuelCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  padding: 16,
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 12,
  borderWidth: 1,
  borderColor: "#EEEEEE",
},

fuelIconBox: {
  width: 48,
  height: 48,
  borderRadius: 12,
  backgroundColor: "#FFF7E6",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 12,
},

fuelIcon: {
  fontSize: 22,
},

fuelContent: {
  flex: 1,
},

fuelPrice: {
  fontSize: 14,
  fontWeight: "700",
  color: "#F59E0B",
  marginLeft: 8,
},
});

export default styles;