import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';

export type PasswordError = {
  length: boolean;
  lower: boolean;
  upper: boolean;
  special: boolean;
  number: boolean;
};

const PasswordValidation = ({
  error,
  password,
}: {
  error: PasswordError;
  password: string;
}) => {
  const isEmpty = !password;

  const validationErrors = [
    {
      error: isEmpty || error?.length,
      message: 'Input a password with 8 to 20 digits',
    },
    {
      error: isEmpty || error?.lower,
      message: 'One lowercase letter (e.g. a-z)',
    },
    {
      error: isEmpty || error?.upper,
      message: 'One uppercase letter (e.g. A-Z)',
    },
    { error: isEmpty || error?.number, message: 'One number (e.g. 0-9)' },
    {
      error: isEmpty || error?.special,
      message: 'One of the following characters: !@#$%^&*)+-',
    },
  ];

  return (
    <View style={styles.container}>
      {validationErrors.map((validationError, index) => (
        <View key={index} style={styles.row}>
          <Icon
            style={styles.icon}
            name={'check-circle-outline'}
            type="material"
            color={validationError.error ? '#D6E3E6' : '#2C76F4'}
          />
          <Text>{validationError.message}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    paddingHorizontal: 4,
  },
});

export default PasswordValidation;
