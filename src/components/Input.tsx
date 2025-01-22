import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

const Input = ({
  label,
  errorMessage,
  ...props
}: { label: String; errorMessage: String } & TextInputProps) => {
  return (
    <View style={[styles.container, errorMessage ? styles.errorBorder : null]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} {...props} />
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: '#070DOD',
    borderWidth: 1,
    margin: 12,
  },
  errorBorder: {
    borderColor: '#D32F2F',
  },
  label: {
    marginTop: 8,
  },
  input: {
    marginVertical: 2,
  },
  error: {
    marginBottom: 8,
    color: '#D32F2F',
    fontSize: 12,
  },
});

export default Input;
