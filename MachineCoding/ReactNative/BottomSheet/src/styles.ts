import { StyleSheet } from 'react-native';

// Sheet height in px — shared by both versions
export const SHEET_HEIGHT = 320;

// Drag distance (px) or velocity (px/s) threshold to dismiss the sheet
export const DISMISS_THRESHOLD = 80;
export const DISMISS_VELOCITY = 0.5; // PanResponder uses px/ms; Gesture uses px/s (500)

export const styles = StyleSheet.create({
  // Fills the whole screen — sits on top of the page content via absoluteFill
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
  },
  // Semi-transparent backdrop behind the sheet; tap it to close
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    height: SHEET_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
  },
  // Drag handle indicator at the top of the sheet
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  closeBtn: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
