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
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    fontSize: 40,
    color: "#222222",
    lineHeight: 40,
    marginRight: 12,
  },

  headerInfo: {
    flex: 1,
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

  moreButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  moreButtonText: {
    fontSize: 28,
    color: "#333333",
  },

  menu: {
    position: "absolute",
    right: 20,
    top: 75,
    width: 190,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 6,
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    zIndex: 10,
  },

  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  menuText: {
    fontSize: 14,
    color: "#333333",
  },

  deleteMenuText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "600",
  },

  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  bigIcon: {
    width: 75,
    height: 75,
    borderRadius: 20,
    backgroundColor: "#FFF4D6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  carEmoji: {
    fontSize: 36,
  },

  vehicleName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222222",
  },

  vehiclePlate: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    elevation: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
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

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  infoLabel: {
    fontSize: 13,
    color: "#777777",
    flex: 1,
  },

  infoValue: {
    fontSize: 13,
    color: "#222222",
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },

  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  historyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
  },

  historyDetail: {
    fontSize: 12,
    color: "#888888",
    marginTop: 4,
  },

  arrow: {
    fontSize: 25,
    color: "#AAAAAA",
    marginLeft: 10,
  },

  emptyText: {
    fontSize: 13,
    color: "#999999",
    paddingVertical: 10,
  },

  notFound: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    marginTop: 100,
  },
});

export default styles;