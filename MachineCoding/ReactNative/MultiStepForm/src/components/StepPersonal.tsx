import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFormContext } from '../context/FormContext';

export const StepPersonal: React.FC = () => {
  const { data, errors, onChange, onNext } = useFormContext();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Details</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[styles.input, errors.firstName && styles.inputError]}
          placeholder="e.g. Shubham"
          value={data.firstName}
          onChangeText={val => onChange('firstName', val)}
          autoFocus={true} // UX improvement: instantly ready to type on mount
        />
        {/* Conditional rendering for atomic field validation */}
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={[styles.input, errors.lastName && styles.inputError]}
          placeholder="e.g. Developer"
          value={data.lastName}
          onChangeText={val => onChange('lastName', val)}
        />
        {errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName}</Text>
        )}
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity style={styles.btnPrimary} onPress={onNext}>
          <Text style={styles.btnPrimaryText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Extracted styles to keep component JSX clean
export const styles = StyleSheet.create({
  container: {
    // 1. Ensures the step utilizes the full vertical bounds passed by the parent App
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    // 2. Standardized inputs with solid borders for high contrast
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#FAFAFA',
  },
  inputError: {
    // 3. Visual feedback: border turns strictly red when validation fails
    borderColor: '#E74C3C',
    backgroundColor: '#FDEDEC',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  navRow: {
    // 4. Flex direction row to align Back/Next buttons properly
    flexDirection: 'row',
    justifyContent: 'flex-end', // Pushes "Next" to the far right
    marginTop: 20,
  },
  btnPrimary: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    // 5. Shadows for clickable affordance
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  btnPrimaryText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  btnSecondary: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  btnSecondaryText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
