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

  reminderEmoji: {
    fontSize: 36,
  },

  reminderTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222222",
  },

  vehicleName: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
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
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  infoLabel: {
    fontSize: 13,
    color: "#777777",
  },

  infoValue: {
    fontSize: 13,
    color: "#222222",
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },

  notFound: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    marginTop: 100,
  },
});

export default styles;