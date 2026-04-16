import { StyleSheet } from 'react-native';
import { TOAST_COLORS } from './Toast/constants';

const btnBase = {
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: 'center' as const,
};

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16, justifyContent: 'center' },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  btnDefault: { ...btnBase, backgroundColor: TOAST_COLORS.default },
  btnSuccess: { ...btnBase, backgroundColor: TOAST_COLORS.success },
  btnError: { ...btnBase, backgroundColor: TOAST_COLORS.error },
  btnWarning: { ...btnBase, backgroundColor: TOAST_COLORS.warning },
  btnInfo: { ...btnBase, backgroundColor: TOAST_COLORS.info },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
