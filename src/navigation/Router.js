import { useState, useEffect } from "react";
import { Text } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

import colors from "../styles/colors";
import Entypo from "@expo/vector-icons/Entypo";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function Router() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserSession().catch((error) =>
      console.error("Kullanıcı oturumu kontrol edilemedi:", error)
    );
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    showMessage({
      message: "Başarılı",
      description: "Çıkış Yapıldı",
      type: "success",
    });
    auth.signOut();
    removeUserFromStorage();
  };

  const removeUserFromStorage = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      setUser(null);
    } catch (error) {
      console.error("Kullanıcı oturumu kaldırılamadı:", error);
    }
  };

  const checkUserSession = async () => {
    try {
      const localStoragedUser = await AsyncStorage.getItem("@user");
      if (localStoragedUser !== null) {
        setUser(JSON.parse(localStoragedUser));
      }
    } catch (error) {
      console.error("Kullanıcı oturumu kontrol edilemedi:", error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={Home}
            options={{
              headerTitle: "Odalar",
              headerStyle: {
                backgroundColor: colors.background,
              },
              headerTintColor: colors.secondary,
              headerTitleAlign: "center",
              headerRight: () => (
                <Entypo
                  name="log-out"
                  size={24}
                  color={colors.secondary}
                  onPress={handleSignOut}
                />
              ),
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignInScreen"
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
