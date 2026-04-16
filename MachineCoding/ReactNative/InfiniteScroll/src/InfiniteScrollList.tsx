import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// --- types ---
interface Post {
  id: number;
  title: string;
  body: string;
}

const PAGE_SIZE = 10;
const API = 'https://jsonplaceholder.typicode.com/posts';

export const InfiniteScrollList = () => {
  // STEP 1 — state
  // data: accumulated list of posts
  // page: which page to fetch next
  // loading: true while a fetch is in-flight (shows footer spinner)
  // hasMore: false when the API returns fewer items than PAGE_SIZE (no more pages)
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // useRef updates synchronously — safe to read inside onEndReached without
  // worrying about stale state. useState is async and causes duplicate fetches
  // when onEndReached fires multiple times before the re-render lands.
  const pageRef = useRef(1);
  const isFetching = useRef(false);

  // STEP 2 — fetch one page from the API and append to existing data
  const fetchPage = useCallback(async (pageNum: number) => {
    isFetching.current = true; // set synchronously before any await
    setLoading(true);
    try {
      const res = await fetch(`${API}?_page=${pageNum}&_limit=${PAGE_SIZE}`);
      const json: Post[] = await res.json();
      setData(prev => [...prev, ...json]);
      // If the API returned fewer items than requested, we've reached the end
      if (json.length < PAGE_SIZE) setHasMore(false);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, []);

  // STEP 3 — load page 1 on mount
  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  // STEP 4 — called by FlatList when the user scrolls near the end
  // Guard with ref (not state) so the check is always current, not stale
  const onEndReached = () => {
    if (isFetching.current || !hasMore) return;
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage; // update synchronously to block duplicate calls
    fetchPage(nextPage);
  };

  // STEP 5 — footer: spinner while loading, "No more posts" when exhausted
  const renderFooter = () => {
    if (loading) return <ActivityIndicator style={styles.footer} />;
    if (!hasMore) return <Text style={styles.footer}>No more posts</Text>;
    return null;
  };

  // STEP 6 — each row
  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.card}>
      <Text style={styles.id}>#{item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body} numberOfLines={2}>
        {item.body}
      </Text>
    </View>
  );

  return (
    // STEP 7 — FlatList wired for infinite scroll
    // onEndReachedThreshold: fire onEndReached when 50% of hidden content remains
    // keyExtractor: unique key per item avoids unnecessary re-renders
    <FlatList
      data={data}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  id: { fontSize: 11, color: '#999', marginBottom: 4 },
  title: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  body: { fontSize: 13, color: '#555' },
  footer: { padding: 16, textAlign: 'center', color: '#999' },
});
