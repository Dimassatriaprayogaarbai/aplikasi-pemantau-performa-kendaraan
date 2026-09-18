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
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222222",
  },

  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 6,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  summaryLabel: {
    fontSize: 13,
    color: "#777777",
  },

  summaryNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222222",
    marginTop: 5,
  },

  summaryIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#FFF4D6",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 25,
  },

  sectionHeader: {
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222222",
  },

  vehicleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  vehicleIcon: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: "#FFF4D6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  vehicleEmoji: {
    fontSize: 23,
  },

  vehicleInfo: {
    flex: 1,
  },

  vehicleName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",
  },

  vehicleDetail: {
    fontSize: 12,
    color: "#777777",
    marginTop: 4,
  },

  vehicleKm: {
    fontSize: 12,
    color: "#888888",
    marginTop: 4,
  },

  arrow: {
    fontSize: 26,
    color: "#AAAAAA",
    marginLeft: 8,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 35,
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 32,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444444",
  },

  emptyText: {
    fontSize: 13,
    color: "#999999",
    marginTop: 5,
  },

  menuContainer: {
    position: "absolute",
    right: 20,
    bottom: 88,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    elevation: 6,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  menuIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
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

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F59E0B",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  fabText: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 32,
  },
});

export default styles;