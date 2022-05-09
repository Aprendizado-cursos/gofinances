import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "./global/styles/theme";
import { AppRoutes } from "./routes/app.routes";
import { SignIn } from "./screens/SignIn";
import { AuthProvider } from "./hooks/auth";

export default function App() {
    const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });

    if (!fontsLoaded) {
        return <AppLoading></AppLoading>;
    }

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <SignIn></SignIn>
            </AuthProvider>

            {/* <NavigationContainer>
                <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary}></StatusBar>
                <AppRoutes></AppRoutes>
            </NavigationContainer> */}
        </ThemeProvider>
    );
}
