# Modal

A modular React Native modal example using the built-in `Modal` component.

<p>
  <img src="preview/01.png" width="800" alt="Modal preview" />
</p>

## Features

- Reusable `AppModal` component inside `components/`.
- Supports custom title and body content through `children`.
- Handles confirm and cancel actions.
- Closes on backdrop press.
- Supports Android back button through `onRequestClose`.
- Uses minimal styling for machine-coding readability.

## Component Structure

```txt
App.js
  └── components/AppModal.js
```

## Usage

```jsx
<AppModal
  visible={isModalVisible}
  title="Delete item?"
  confirmText="Delete"
  cancelText="Keep"
  onClose={closeModal}
  onConfirm={handleConfirm}
>
  <Text>This action will remove the selected item.</Text>
</AppModal>
```

## Props

| Prop          | Type        | Default     | Description                         |
| ------------- | ----------- | ----------- | ----------------------------------- |
| `visible`     | `boolean`   | -           | Controls modal open or close state. |
| `title`       | `string`    | -           | Modal heading text.                 |
| `children`    | `ReactNode` | -           | Custom modal body content.          |
| `confirmText` | `string`    | `"Confirm"` | Confirm button label.               |
| `cancelText`  | `string`    | `"Cancel"`  | Cancel button label.                |
| `onClose`     | `function`  | -           | Runs when modal should close.       |
| `onConfirm`   | `function`  | -           | Runs when confirm button is tapped. |

## Machine Coding Cheat Sheet

### 1. Keep open state in parent

```jsx
const [isModalVisible, setIsModalVisible] = useState(false);

function openModal() {
  setIsModalVisible(true);
}

function closeModal() {
  setIsModalVisible(false);
}
```

### 2. Use built-in Modal

```jsx
<Modal
  visible={visible}
  transparent
  animationType="fade"
  onRequestClose={onClose}
>
  {/* modal UI */}
</Modal>
```

### 3. Add backdrop close

Place a full-screen `Pressable` behind the card.

```jsx
<View style={styles.overlay}>
  <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
  <View style={styles.card}>{/* content */}</View>
</View>
```

### 4. Make content reusable

Use `children` so the modal can render any body content.

```jsx
function AppModal({ title, children }) {
  return (
    <View>
      <Text>{title}</Text>
      <View>{children}</View>
    </View>
  );
}
```

### 5. Wire confirm and cancel

```jsx
<Pressable onPress={onClose}>
  <Text>{cancelText}</Text>
</Pressable>

<Pressable onPress={onConfirm}>
  <Text>{confirmText}</Text>
</Pressable>
```

## Interview Follow-ups

| Requirement        | Approach                                           |
| ------------------ | -------------------------------------------------- |
| Alert modal        | Pass title, message, and one confirm button.       |
| Bottom sheet modal | Align content with `justifyContent: "flex-end"`.   |
| Disable backdrop   | Add a `closeOnBackdropPress` prop.                 |
| Loading on confirm | Add `loading` prop and disable the confirm button. |
| Custom footer      | Accept a `footer` prop or render buttons manually. |
| Keyboard support   | Wrap content with `KeyboardAvoidingView`.          |

## Edge Cases

- Android back press: always pass `onRequestClose`.
- Accidental close: make backdrop close configurable for destructive actions.
- Long content: wrap modal body in `ScrollView`.
- Multiple modals: keep one source of truth for which modal is active.
- Accessibility: add labels and announce important modal text.
