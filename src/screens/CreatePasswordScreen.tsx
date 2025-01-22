import { Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '../components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordValidation, {
  PasswordError,
} from '../components/PasswordValidateLayout';
import { createPasswordSchema } from '../schema/passwordSchema';

const CreatePasswordScreen = () => {
  const {
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });
  const password = watch('password');

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
            <Input
              // secureTextEntry={true}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              label={'Password'}
              placeholder="@Password1"
              onChangeText={(text: String) => {
                onChange(text);
              }}
              errorMessage={
                !errors.password
                  ? ''
                  : 'Your password does not fulfill the complexity'
              }
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
            <Input
              // secureTextEntry={true}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              label={'Confirm password'}
              placeholder="@Password1"
              onChangeText={(text: String) => {
                onChange(text);
              }}
              errorMessage={
                !errors.confirmPassword ? '' : 'Passwords input are not matched'
              }
            />
          )}
          name="confirmPassword"
        />
        <PasswordValidation
          password={password}
          error={errors.password as unknown as PasswordError}
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
