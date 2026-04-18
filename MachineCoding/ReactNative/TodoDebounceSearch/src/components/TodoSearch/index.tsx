import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { useDebounce } from '../../hooks/useDebounce';
import { TodoSearchProps } from '../../types';
import { styles } from './styles';

export const TodoSearch: React.FC<TodoSearchProps> = ({ onSearch }) => {
  // Local state bound immediately to input UI (allows 60FPS typing without lagging)
  const [localSearch, setLocalSearch] = useState('');

  // Custom hook isolates the value, strictly releasing it outwards only every 400ms
  const debouncedSearchTerm = useDebounce(localSearch, 400);

  // When the debounced timer triggers safely, propagate the search filter to the parent
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <View style={styles.container}>
      {/* 
        This is an excellent example of performance logic. 
        If we bound global state directly to `onChangeText`, typing 10 characters 
        rapidly would cause the `<FlatList>` to completely recalculate and re-map 10 times instantly.
        Instead, the localized state permits free unblocked typing.
      */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Search todos..."
        value={localSearch}
        onChangeText={setLocalSearch}
        clearButtonMode="while-editing" // Native iOS clear 'X' icon
      />
    </View>
  );
};
