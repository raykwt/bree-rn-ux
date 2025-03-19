import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { CircleCheck } from "lucide-react-native";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

interface PasswordRequirement {
  label: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    label: "At least 8 characters long",
    validator: (password) => password.length >= 8,
  },
  {
    label: "Contains uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Contains lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    label: "Contains number",
    validator: (password) => /[0-9]/.test(password),
  },
  {
    label: "Contains special character",
    validator: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

interface Props {
  password: string;
  onChangePassword: (password: string) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export function PasswordValidation({
  password,
  onChangePassword,
  onValidationChange,
}: Props) {
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    const validationResult = passwordSchema.safeParse(password);
    onValidationChange?.(validationResult.success);
  }, [password, onValidationChange]);

  return (
    <View style={styles.container}>
      <TextInput
        value={password}
        onChangeText={onChangePassword}
        placeholder="Enter password"
        secureTextEntry
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <View style={styles.requirementsList}>
        {passwordRequirements.map((requirement, index) => {
          const isValid = requirement.validator(password);
          return (
            <View key={index} style={styles.requirementItem}>
              <CircleCheck color={!isValid ? "#D6E3E6" : "#2C76F4"} />
              <Text>{requirement.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 400,
    padding: 16,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputFocused: {
    borderColor: "#3b82f6",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  requirementsList: {
    marginTop: 16,
    gap: 8,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  requirementText: {
    fontSize: 14,
    color: "#64748b",
  },
});
