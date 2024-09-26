import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{
            headerTitle: "Odalar",
            headerStyle: { backgroundColor: "#f4511e" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="SignUpScreen" component={SignUp} />
        <Stack.Screen name="SignInScreen" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
