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

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 12,
  },

  reminderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",
  },

  vehicleName: {
    fontSize: 13,
    color: "#555555",
    marginTop: 4,
  },

  cardDate: {
    fontSize: 12,
    color: "#888888",
    marginTop: 5,
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  },

  progressBar: {
    height: "100%",
    borderRadius: 10,
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 9,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  plateText: {
    fontSize: 12,
    color: "#888888",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 25,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#999999",
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