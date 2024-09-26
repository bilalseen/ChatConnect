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

const Stack = createNativeStackNavigator();

export default function Router() {
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
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.background,
              headerTitleAlign: "center",
              headerRight: () => (
                <Entypo
                  name="log-out"
                  size={24}
                  color="black"
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
