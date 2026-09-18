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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    elevation: 2,
  },

  backText: {
    fontSize: 32,
    color: "#333333",
    lineHeight: 34,
    marginTop: -3,
  },

helperText: {
  fontSize: 12,
  color: "#888888",
  marginTop: 2,
  marginBottom: 18,
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
    borderRadius: 18,
    padding: 18,
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#222222",
    backgroundColor: "#FAFAFA",
  },

  saveButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F59E0B",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  saveButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  cancelButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555555",
  },
});

export default styles;