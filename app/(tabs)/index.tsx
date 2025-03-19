import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { PasswordValidation } from "../../components/PasswordValidation";
import { primaryBlue } from "@/constants/Colors";

export default function HomeScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = () => {
    console.log("Password submitted:", password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard?.dismiss}>
      <View style={styles.container}>
        <PasswordValidation
          password={password}
          confirmPassword={confirmPassword}
          onChangeConfirmPassword={setConfirmPassword}
          onChangePassword={setPassword}
          onValidationChange={setIsValid}
        />
        <Pressable
          style={[styles.button, !isValid && styles.buttonDisabled]}
          disabled={!isValid}
          onPress={handleSubmit}
        >
          <Text
            style={[styles.buttonText, !isValid && styles.buttonTextDisabled]}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: primaryBlue,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: "#88acec",
    shadowOpacity: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextDisabled: {
    color: "#fff",
  },
});
