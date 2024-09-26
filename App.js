import FlashMessage from "react-native-flash-message";
import Router from "./src/navigation/Router";

export default function App() {
  return (
    <>
      <Router />
      <FlashMessage position="top" />
    </>
  );
}
