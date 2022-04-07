import React from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "./global/styles/theme";
import { Dashboard } from "./screens/Dashboard";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Dashboard></Dashboard>
        </ThemeProvider>
    );
}
