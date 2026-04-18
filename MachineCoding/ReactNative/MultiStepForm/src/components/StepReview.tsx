import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormContext } from '../context/FormContext';
import { styles as commonStyles } from './StepPersonal';

export const StepReview: React.FC = () => {
  const { data, onNext, onBack } = useFormContext();
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Review & Submit</Text>

      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>First Name</Text>
          <Text style={styles.rowValue}>{data.firstName}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Last Name</Text>
          <Text style={styles.rowValue}>{data.lastName}</Text>
        </View>
      </View>

      <View style={[commonStyles.navRow, styles.navRowSpaced]}>
        <TouchableOpacity style={commonStyles.btnSecondary} onPress={onBack}>
          <Text style={commonStyles.btnSecondaryText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[commonStyles.btnPrimary, styles.btnSubmit]}
          onPress={onNext}
        >
          <Text style={commonStyles.btnPrimaryText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    // Slight shadow to separate the card from background natively
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 8,
  },
  btnSubmit: {
    backgroundColor: '#27AE60', // Native green color indicating success/submit logic
    shadowColor: '#27AE60',
  },
  navRowSpaced: {
    justifyContent: 'space-between',
  },
});
