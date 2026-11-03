import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

export interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  isReadonly?: boolean;
  isDisabled?: boolean;
  helperText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  isReadonly = false,
  isDisabled = false,
  helperText,
  value,
  placeholder,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrapper,
          error ? styles.wrapperError : null,
          isDisabled ? styles.wrapperDisabled : null,
          isReadonly ? styles.wrapperReadonly : null,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            isDisabled ? styles.textDisabled : null,
            isReadonly ? styles.textReadonly : null,
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          editable={!isDisabled && !isReadonly}
          {...props}
        />
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  inputWrapper: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  wrapperError: {
    borderColor: '#dc2626',
    borderWidth: 1.5,
  },
  wrapperDisabled: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
    opacity: 0.6,
  },
  wrapperReadonly: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
  },
  input: {
    fontSize: 14,
    color: '#111827',
    paddingVertical: 0,
  },
  textDisabled: {
    color: '#9ca3af',
  },
  textReadonly: {
    color: '#4b5563',
  },
  errorText: {
    fontSize: 12,
    color: '#dc2626',
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});
