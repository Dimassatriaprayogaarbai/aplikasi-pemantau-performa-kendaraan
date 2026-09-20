import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginTop: 20,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    fontSize: 40,
    color: "#222222",
    lineHeight: 40,
    marginRight: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222222",
  },

  subtitle: {
    fontSize: 13,
    color: "#777777",
    marginTop: 5,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
  },

  countText: {
    fontSize: 13,
    color: "#F59E0B",
    fontWeight: "700",
  },

  vehicleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",

    elevation: 2,

    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  vehicleIcon: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#FFF4D6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  vehicleEmoji: {
    fontSize: 27,
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
    fontSize: 13,
    color: "#777777",
    marginTop: 4,
  },

  vehicleKm: {
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "600",
    marginTop: 5,
  },

  arrow: {
    fontSize: 28,
    color: "#AAAAAA",
    marginLeft: 10,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
  },

  emptyText: {
    fontSize: 13,
    color: "#888888",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 18,
  },

  addButton: {
    backgroundColor: "#F59E0B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default styles;