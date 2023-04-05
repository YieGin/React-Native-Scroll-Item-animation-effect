import {
  StatusBar,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import Animated from "react-native-reanimated";

export default function App() {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const [data, setData] = React.useState(false);

  useEffect(() => {
    async function getStoreData() {
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data);
    }
    getStoreData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Image
        style={StyleSheet.absoluteFillObject}
        source={require("./assets/1.jpg")}
        blurRadius={1}
      />
      <Animated.FlatList
        keyExtractor={(item) => item.id.toString()}
        data={data}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
          { useNativeDriver: true },
        ])}
        renderItem={({ item, index }) => {
          const inputRange = [-1, 0, 95 * index, 95 * (index + 2)];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacityInputRange = [-1, 0, 95 * index, 95 * (index + 1)];
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: 20,
                marginBottom: 20,
                justifyContent: "center",
                alignItems: "center",
                opacity,
                transform: [{ scale }],
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 12,
                  marginRight: 20,
                }}
                source={{ uri: item.image }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    width: 260,
                    paddingRight: 20,
                  }}
                >
                  {item.title}
                </Text>
                <Text>{item.price}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
