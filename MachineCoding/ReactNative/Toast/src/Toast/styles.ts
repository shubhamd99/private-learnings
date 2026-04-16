import { StyleSheet } from 'react-native';

export const toastStyles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 220,
    maxWidth: 320,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    fontSize: 18,
  },
  message: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  closeBtn: {
    padding: 2,
  },
  closeText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: '600',
  },
});

export const animatedToastStyles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-end',
  },
});

export const containerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 16,
    left: 16,
    gap: 8,
    alignItems: 'flex-end',
  },
});
