import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AlertCircle, CircleCheck } from "lucide-react-native";
import { z } from "zod";
import { grey, primaryBlue } from "../constants/Colors";

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
    label: "At least 8 characterss",
    validator: (password) => password.length >= 8,
  },
  {
    label: "Contains uppercase letter A-Z",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Contains lowercase letter a-z",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    label: "Contains number 0-9",
    validator: (password) => /[0-9]/.test(password),
  },
  {
    label: "Contains special character !@#$%^&*()",
    validator: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

interface Props {
  password: string;
  confirmPassword: string;
  onChangeConfirmPassword: (confirmPassword: string) => void;
  onChangePassword: (password: string) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const passwordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export function PasswordValidation({
  password,
  confirmPassword,
  onChangePassword,
  onChangeConfirmPassword,
  onValidationChange,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const shouldShowMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;
  useEffect(() => {
    const result = passwordFormSchema.safeParse({ password, confirmPassword });
    const shouldShowMismatch =
      confirmPassword.length > 0 && password !== confirmPassword;
    onValidationChange?.(!shouldShowMismatch && result.success);
  }, [password, confirmPassword, onValidationChange]);

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
      <TextInput
        value={confirmPassword}
        onChangeText={onChangeConfirmPassword}
        placeholder="Confirm password"
        secureTextEntry
        style={[styles.input, confirmFocused && styles.inputFocused]}
        onFocus={() => setConfirmFocused(true)}
        onBlur={() => setConfirmFocused(false)}
      />
      {shouldShowMismatch && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>Passwords don't match</Text>
        </View>
      )}

      <View style={styles.requirementsList}>
        {passwordRequirements.map((requirement, index) => {
          const isValid = requirement.validator(password);
          return (
            <View key={index} style={styles.requirementItem}>
              <CircleCheck color={!isValid ? grey : primaryBlue} />
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
    borderColor: grey,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  inputFocused: {
    borderColor: primaryBlue,
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
  errorBanner: {
    marginTop: 8,
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#fee2e2",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "500",
  },
});
