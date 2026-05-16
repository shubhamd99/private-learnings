import { useEffect, useRef, useState } from "react";
import { FlatList, View, Dimensions } from "react-native";
import CarouselItem from "./CarouselItem";
import PaginationDots from "./PaginationDots";

const { width } = Dimensions.get("window");

export default function Carousel({ data, autoPlay = true, interval = 2000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  function goToIndex(index) {
    listRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    setActiveIndex(index);
  }

  function handleScroll(event) {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  }

  useEffect(() => {
    if (!autoPlay || data.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
      goToIndex(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex, autoPlay, data.length, interval]);

  return (
    <View>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CarouselItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <PaginationDots total={data.length} activeIndex={activeIndex} />
    </View>
  );
}
