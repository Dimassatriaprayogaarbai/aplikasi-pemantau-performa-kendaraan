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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },

  headerInfo: {
  flex: 1,
},

  backButton: {
    fontSize: 38,
    color: "#222222",
    marginRight: 12,
    lineHeight: 40,
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

  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#222222",
    marginBottom: 5,
  },

  dateInputWrapper: {
    width: "100%",
    marginBottom: 5,
  },

  dropdown: {
    width: "100%",
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownText: {
    fontSize: 16,
    color: "#222222",
  },

  dropdownPlaceholder: {
    fontSize: 16,
    color: "#999999",
  },

  dropdownArrow: {
    fontSize: 20,
    color: "#777777",
  },

  dropdownList: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    marginTop: 6,
    overflow: "hidden",
  },

  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  dropdownItemName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
  },

  dropdownItemDetail: {
    fontSize: 12,
    color: "#888888",
    marginTop: 3,
  },

  helperText: {
    fontSize: 12,
    color: "#888888",
    marginTop: 6,
    marginBottom: 8,
  },

  saveButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  cancelButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  cancelButtonText: {
    color: "#555555",
    fontSize: 16,
    fontWeight: "700",
  },

  notFound: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    marginTop: 50,
  },
});

export default styles;