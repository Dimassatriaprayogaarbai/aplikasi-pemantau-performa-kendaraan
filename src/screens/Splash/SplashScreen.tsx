import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

type SplashScreenProps = {
  onFinish: () => void;
};

export default function SplashScreen({
  onFinish,
}: SplashScreenProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.75)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity,
          transform: [{ scale }],
        }}
      >
  <Image
  source={require("../../assets/logoapp.png")}
  style={styles.logo}
  resizeMode="contain"
/>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: width * 0.8,
    height: width * 0.8,
  },
});