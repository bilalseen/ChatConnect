import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import colors from "../styles/colors";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function Router() {
  const [user, setUser] = useState(null);
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
