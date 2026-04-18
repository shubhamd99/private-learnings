import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import { FormData } from '../types';

export const TOTAL_STEPS = 2;

interface FormContextType {
  currentStep: number;
  data: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  onChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<FormData>({
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const onChange = (field: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    if (step === 1) {
      if (!data.firstName.trim()) {
        newErrors.firstName = 'Required';
        isValid = false;
      }
      if (!data.lastName.trim()) {
        newErrors.lastName = 'Required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const onNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(prev => prev + 1);
      } else {
        Alert.alert(
          'Success!',
          'Form Submitted Successfully\n\n' + JSON.stringify(data, null, 2),
        );
      }
    }
  };

  const onBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <FormContext.Provider
      value={{ currentStep, data, errors, onChange, onNext, onBack }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormContext must be used within FormProvider');
  return ctx;
};
