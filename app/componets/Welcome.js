import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from "react-native";
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'react-native'; // use native StatusBar here

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email || !password) {
      alert("Please fill in both fields.");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
    } else {
      axios.post('http://192.168.1.11:3000/login', {
        email,
        password
      })
        .then(response => {
          const token = response.data.token

          alert("Login Successful!");
          navigation.navigate("MainTabs");
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          console.error(error);
          if (error.response) {
            alert(error.response.data.message);
          } else {
            alert("Login Failed");
          }
        });
    }
  }

  return (
    <SafeAreaView
      style={{
        flex
          : 1
      }}
    >

      <ImageBackground
        source={{ uri: 'https://img.freepik.com/free-vector/abstract-background-gradient-modern-design_677411-3110.jpg?ga=GA1.1.2138575567.1739869190&semt=ais_hybrid&w=740' }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
        >
          <Text style={{ fontSize: 54, fontWeight: 'bold', color: 'white' }}>Login</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 5 }}>Welcome to PhotoDrop</Text>
          <Text style={{ fontSize: 15, color: 'white', marginTop: 2, textAlign: 'center' }}>
            Please login to continue using the app.
          </Text>


          <Text style={{ color: "#888", alignSelf: "flex-start", fontSize: 15, marginTop: 20 }}>
            Email
          </Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              marginTop: 10,
              width: 360,
              height: 50,
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
            placeholderTextColor="gray"
          />
          <Text style={{ color: "#888", alignSelf: "flex-start", fontSize: 15, marginTop: 10 }}>
            Password
          </Text>


          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              marginTop: 10,
              width: 360,
              height: 50,
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
            placeholderTextColor="gray"
          />

          <TouchableOpacity
            onPress={handleLogin}
            style={{
              marginTop: 20,
              width: 360,
              height: 50,
              backgroundColor: '#007BFF',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>

          <Text style={{ color: 'white', fontSize: 15, marginTop: 20, fontWeight: "bold" }}>OR</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{
              marginTop: 10,
              width: 300,
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#666', fontSize: 15, fontWeight: 'bold' }}>Dont have any account ? Register</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
