import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get('window');

export default function Profile({ navigation }) {
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Header */}
      <View style={{
        padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        borderBottomWidth: 0.5, borderBottomColor: "#333"
      }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Profile</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Profile Info */}
        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
          {/* Profile Picture */}
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6hUuf4xSQPDlCGwZpPXsJwbruGXSMS0xWEw&s' }}
            style={{ width: 130, height: 130, borderRadius: 100 }}
          />
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 10 }}>Rudra Upasani</Text>


          {/* Bio */}
          <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' , padding:10 }}>
            🚀 Developer | Entrepreneur
            👨‍💻 Building apps & websites
            📱 React | React Native | MERN Stack
            💡 Always learning. Always building.

          </Text>

          <TouchableOpacity
            style={{
              marginTop: 20,
              width: '90%',
              maxWidth: 400,
              height: 50,
              backgroundColor: '#444',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Edit Profile</Text>
          </TouchableOpacity>

        </View>

        {/* Tab Navigation */}
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#333' }}>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: '#777' }}
          >
            <Ionicons name="grid-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={{ justifyContent: 'center', alignItems: 'center', padding: 100 }}
        >
          <Text
            style={{ color: '#444', fontSize: 15, alignSelf: 'center', fontWeight: 'bold' }}

          >
            No Reels Upload
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}