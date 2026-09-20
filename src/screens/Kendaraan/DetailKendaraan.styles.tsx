import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  header: {
    height: 64,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingHorizontal: 16,
  },

  backButton: {
    fontSize: 36,
    color: "#222222",
    fontWeight: "300",
    lineHeight: 40,
    width: 40,
  },

  headerInfo: {
    flex: 1,
    marginLeft: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222222",
  },

  subtitle: {
    fontSize: 12,
    color: "#777777",
    marginTop: 2,
  },

  mainCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  bigIcon: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: "#FFF7E6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  vehicleEmoji: {
    fontSize: 40,
  },

  vehicleTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222222",
    textAlign: "center",
  },

  vehicleBrand: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 18,
    elevation: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 9,
  },

  infoLabel: {
    fontSize: 14,
    color: "#777777",
    flex: 1,
  },

  infoValue: {
    fontSize: 14,
    color: "#222222",
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },

  editButton: {
    marginHorizontal: 16,
    marginTop: 20,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F59E0B",
    justifyContent: "center",
    alignItems: "center",
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  deleteButton: {
    marginHorizontal: 16,
    marginTop: 10,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  section: {
    marginHorizontal: 16,
    marginTop: 22,
  },

  dataCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  dataTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 7,
  },

  dataText: {
    fontSize: 13,
    color: "#777777",
    marginTop: 3,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  emptyText: {
    fontSize: 14,
    color: "#999999",
  },

  notFound: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    marginTop: 50,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 10,
  },

  modalText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 21,
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#444444",
    fontSize: 14,
    fontWeight: "600",
  },

  confirmButton: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default styles;