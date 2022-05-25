import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "./global/styles/theme";
import { AuthProvider, useAuth } from "./hooks/auth";
import { Routes } from "./routes";

export default function App() {
    const {userStorageLoading} = useAuth()
    const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });

    if (!fontsLoaded || userStorageLoading) {
        return <AppLoading></AppLoading>;
    }

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Routes></Routes>
            </AuthProvider>
        </ThemeProvider>
    );
}
