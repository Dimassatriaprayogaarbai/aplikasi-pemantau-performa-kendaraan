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
    marginRight: 15,
    lineHeight: 40,
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

  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
    marginTop: 14,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    color: "#222222",
  },

  textArea: {
    height: 90,
    paddingTop: 14,
    textAlignVertical: "top",
  },

  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownText: {
    color: "#222222",
    fontSize: 15,
  },

  dropdownPlaceholder: {
    color: "#999999",
    fontSize: 15,
  },

  dropdownArrow: {
    fontSize: 18,
    color: "#777777",
  },

  dropdownList: {
    marginTop: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 10,
    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  dropdownItemName: {
    fontSize: 15,
    color: "#222222",
    fontWeight: "600",
  },

  dropdownItemDetail: {
    fontSize: 12,
    color: "#888888",
    marginTop: 3,
  },

  saveButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#F59E0B",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  cancelButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  cancelButtonText: {
    color: "#555555",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default styles;