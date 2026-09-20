import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  header: {
    height: 64,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  backIconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 36,
    color: "#222222",
    lineHeight: 40,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222222",
  },

  headerSpace: {
    width: 40,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  vehicleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  vehicleIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#FFF7E6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  vehicleIcon: {
    fontSize: 25,
  },

  vehicleInfo: {
    flex: 1,
  },

  vehicleName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 4,
  },

  vehiclePlate: {
    fontSize: 13,
    color: "#777777",
  },

  formSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 20,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#222222",
    backgroundColor: "#FFFFFF",
  },

  inputWithUnit: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    backgroundColor: "#FFFFFF",
  },

  inputUnitText: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: "#222222",
  },

  unitText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777777",
    paddingHorizontal: 14,
  },

  inputWithPrefix: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  prefixText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777777",
    paddingLeft: 14,
  },

  inputPrefixText: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    fontSize: 15,
    color: "#222222",
  },

  readOnlyInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },

  readOnlyText: {
    flex: 1,
    paddingLeft: 14,
    fontSize: 15,
    fontWeight: "600",
    color: "#555555",
  },

  helperText: {
    fontSize: 12,
    color: "#888888",
    marginTop: 6,
  },

  fullTankRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    paddingVertical: 8,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  checkboxActive: {
    backgroundColor: "#F59E0B",
    borderColor: "#F59E0B",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  fullTankContent: {
    flex: 1,
  },

  fullTankTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 3,
  },

  fullTankSubtitle: {
    fontSize: 12,
    color: "#888888",
  },

  saveButton: {
    height: 52,
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  errorText: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

export default styles;