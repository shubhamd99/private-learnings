import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { FormProvider, useFormContext } from './src/context/FormContext';
import { StepPersonal } from './src/components/StepPersonal';
import { StepReview } from './src/components/StepReview';
import { ProgressBar } from './src/components/ProgressBar';

// The orchestrated wizard relies completely on Context to grab step index.
const FormWizard = () => {
  const { currentStep } = useFormContext();

  return (
    <View style={styles.contentContainer}>
      {/* Zero props passed - components are fully self-sufficient using Context */}
      {currentStep === 1 && <StepPersonal />}
      {currentStep === 2 && <StepReview />}
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Master Form Provider wraps everything down to the progress bar natively */}
          <FormProvider>
            <ProgressBar />
            <FormWizard />
          </FormProvider>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});
