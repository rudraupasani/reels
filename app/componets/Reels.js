import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
  Image
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Video } from 'expo-av';
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

const videos = [
  {
    id: "1",
    uri: "https://cdn.pixabay.com/video/2025/06/19/286644_tiny.mp4",
    username: "bigbuckbunny",
    caption: "Amazing nature video! 🌟 #nature #wildlife #viral",
    likes: 0,
  },
  {
    id: "2",
    uri: "https://cdn.pixabay.com/video/2022/11/27/140644-775595919_tiny.mp4",
    username: "movieclips",
    caption: "Classic movie moments that hit different 🎬 #movies #classic #cinema",
    likes: 0,
  },
  {
    id: "3",
    uri: "https://cdn.pixabay.com/video/2022/11/11/138587-770009851_tiny.mp4",
    username: "animationfan",
    caption: "Who else loves animated shorts? Drop a ❤️ if you agree! #animation #shorts",
    likes: 0,
  },
  {
    id: "4",
    uri: "https://cdn.pixabay.com/video/2022/07/24/125314-733046618_tiny.mp4",
    username: "travelgram",
    caption: "Wanderlust activated! 🌍✈️ #travel #explore #adventure",
    likes: 0,
  },
];

export default function Reels({ navigation }) {
  const [likes, setLikes] = useState({});
  const [follows, setFollows] = useState({});
  const [isMuted, setIsMuted] = useState(true); // << Global mute state

  const flatListRef = useRef(null);
  const videoRefs = useRef([]);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const renderItem = ({ item, index }) => (
    <View style={{
      height: height,
      width: width,
      backgroundColor: "#000",
      position: "relative",
    }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={toggleMute} // Toggle mute on tap
      >
        <Video
          ref={(ref) => (videoRefs.current[index] = ref)}
          source={{ uri: item.uri }}
          style={{
            width: "100%",
            height: "90%",
            position: "absolute",
          }}
          resizeMode="contain"
          isLooping
          isMuted={isMuted}
          shouldPlay={index === currentVisibleIndex}
        />
      </TouchableOpacity>

      <View style={{
        position: "absolute",
        right: 12,
        bottom: 120,
        alignItems: "center",
        zIndex: 10
      }}>
        <TouchableOpacity style={{ alignItems: "center", marginBottom: 24 }} onPress={() => toggleLike(item.id)}>
          <Ionicons
            name={likes[item.id] ? "heart" : "heart-outline"}
            size={35}
            color={likes[item.id] ? "#ff0050" : "#fff"}
          />
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600", marginTop: 4 }}>
            {formatNumber(item.likes + (likes[item.id] ? 1 : 0))}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center", marginBottom: 24 }}>
          <Feather name="more-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={{
        position: "absolute",
        bottom: 80,
        left: 16,
        right: 80,
        zIndex: 10
      }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>@{item.username}</Text>
          {follows[item.id] && (
            <Text style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 14, marginLeft: 8 }}>• Following</Text>
          )}
        </View>

        <Text style={{
          color: "#fff", fontSize: 14, lineHeight: 20, marginBottom: 12
        }} numberOfLines={2}>
          {item.caption}
        </Text>
      </View>

      <View style={{
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {videos.map((_, i) => (
          <View
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: "#fff",
              marginHorizontal: 3,
              opacity: i === index ? 1 : 0.3
            }}
          />
        ))}
      </View>

      {/* Show mute/unmute icon */}
      <View style={{ position: 'absolute', top: 40, right: 20 }}>
        <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={30} color="#fff" />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <FlatList
        ref={flatListRef}
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewConfigRef.current}
        vertical
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}
