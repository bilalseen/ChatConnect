import { useState, useEffect } from "react";
import { Text } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Room from "../pages/Room";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

import colors from "../styles/colors";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

import { showMessage } from "react-native-flash-message";
import RoomDetails from "../pages/RoomDetails";

const Stack = createNativeStackNavigator();

export default function Router({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
                backgroundColor: colors.tertiary,
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
          <Stack.Screen
            name="RoomScreen"
            component={Room}
            options={({ navigation }) => ({
              headerTitle: "Room",
              headerStyle: {
                backgroundColor: colors.background,
              },
              headerTintColor: colors.secondary,
              headerTitleAlign: "center",
              headerRight: () => (
                <Feather
                  name="info"
                  size={24}
                  color={colors.secondary}
                  onPress={() => navigation.navigate("RoomDetailsScreen")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="RoomDetailsScreen"
            component={RoomDetails}
            options={{
              headerTitle: "RoomDetails",
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
                  onPress={() => navigation.navigate("RoomDetailsScreen")}
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
