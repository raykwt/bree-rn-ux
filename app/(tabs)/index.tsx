import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const lower = new RegExp("(?=.*[a-z])");
const upper = new RegExp("(?=.*[A-Z])");
const number = new RegExp("(?=.*[0-9])");
const special = new RegExp("(?=.*[!@#$%^&*)+-])");

const passwordSchema = z
  .string({ required_error: "Your password does not fulfill the complexity." })
  .refine((data) => lower.test(data), {
    path: ["lower"],
  })
  .refine((data) => upper.test(data), {
    path: ["upper"],
  })
  .refine((data) => number.test(data), {
    path: ["number"],
  })
  .refine((data) => special.test(data), {
    path: ["special"],
  })
  .refine((data) => data.length >= 8 && data.length <= 20, {
    path: ["length"],
  });

export const createPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string({}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });
const CreatePasswordScreen = () => {
  const {
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });
  const password = watch("password");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}> Set your password </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              // secureTextEntry={true}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="@Password1"
              onChangeText={(text: String) => {
                onChange(text);
              }}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              // secureTextEntry={true}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="@Password1"
              onChangeText={(text: String) => {
                onChange(text);
              }}
            />
          )}
          name="confirmPassword"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    paddingHorizontal: 12,
    fontSize: 32,
  },
});

export default CreatePasswordScreen;
