import {
  View,
  Text,
  Image,
  Animated,
  Easing,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react-native";
import { useColorScheme } from "nativewind";

const BUBBLES = [
  { top: "12%", left: "8%", size: 14, color: "#8B7355", opacity: 0.8 },
  { top: "18%", left: "14%", size: 8, color: "#6B9E8A", opacity: 0.6 },
  { top: "8%", right: "12%", size: 10, color: "#6B9E8A", opacity: 0.5 },
  { top: "15%", right: "8%", size: 6, color: "#6B9E8A", opacity: 0.4 },
  { top: "35%", left: "5%", size: 8, color: "#6B9E8A", opacity: 0.4 },
  { top: "55%", left: "6%", size: 20, color: "#2D8B6B", opacity: 0.9 },
  { top: "62%", right: "8%", size: 12, color: "#8B7355", opacity: 0.7 },
  { bottom: "25%", right: "10%", size: 10, color: "#8B7355", opacity: 0.6 },
];

const Welcome = () => {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const logoPosition = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentPosition = useRef(new Animated.Value(40)).current;
  const bubblesOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(logoPosition, {
            toValue: -height * 0.1,
            duration: 700,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(bubblesOpacity, {
            toValue: 0.4,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(contentPosition, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }, 1500);

    setTimeout(() => {
      router.push("/(auth)/role");
    }, 5000);
  }, []);

  return (
    <View
      className={
        colorScheme === "dark"
          ? "flex-1 bg-[#090F0D]"
          : "flex-1 bg-[#0D9488]"
      }
    >
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          backgroundColor:
            colorScheme === "dark"
              ? "rgba(9, 15, 13, 0.6)"
              : "rgba(5, 30, 20, 0.4)",
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: -140,
          right: -120,
          width: 400,
          height: 400,
          borderRadius: 200,
          backgroundColor: "rgba(180, 140, 60, 0.06)",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: -120,
          right: -100,
          width: 340,
          height: 340,
          borderRadius: 170,
          backgroundColor: "rgba(180, 140, 60, 0.07)",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: -100,
          right: -80,
          width: 280,
          height: 280,
          borderRadius: 140,
          backgroundColor: "rgba(180, 140, 60, 0.08)",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: -80,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: "rgba(180, 140, 60, 0.09)",
        }}
      />

      <Animated.View
        style={{ opacity: bubblesOpacity, position: "absolute", inset: 0 }}
      >
        {BUBBLES.map((bubble, i) => (
          <View
            key={i}
            style={{
              position: "absolute",
              width: bubble.size,
              height: bubble.size,
              borderRadius: bubble.size / 2,
              backgroundColor: bubble.color,
              opacity: bubble.opacity,
              top: (bubble as any).top,
              left: (bubble as any).left,
              right: (bubble as any).right,
              bottom: (bubble as any).bottom,
            }}
          />
        ))}
      </Animated.View>

      <TouchableOpacity
        className="bg-white/20 dark:bg-white/20 w-14 h-14 rounded-full items-center justify-center"
        style={{ position: "absolute", top: 48, right: 24 }}
        onPress={toggleColorScheme}
      >
        {colorScheme === "dark" ? (
          <Sun color="#F5A623" size={20} />
        ) : (
          <Moon color="white" size={20} />
        )}
      </TouchableOpacity>

      <Animated.View
        className="flex-1 items-center justify-center"
        style={{ transform: [{ translateY: logoPosition }] }}
      >
        <Image
          source={require("../../../assets/pool_icon_256.png")}
          className="w-52 h-52"
          resizeMode="contain"
        />
        <Text
          style={{ fontFamily: "Nunito_800ExtraBold" }}
          className="text-white text-5xl"
        >
          Pool
        </Text>
        <Animated.Text
          style={{
            fontFamily: "Nunito_400Regular",
            opacity: contentOpacity,
            transform: [{ translateY: contentPosition }],
            fontSize: 18,
          }}
          className="text-white/50 font-semibold text-center mt-4 w-64"
        >
          Your family. Your pool. No drama.
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 w-full flex-row justify-center gap-2"
      >
        <View className="w-5 h-2 rounded-full bg-white" />
        <View className="w-2 h-2 rounded-full bg-white/40" />
      </Animated.View>
    </View>
  );
};

export default Welcome;
