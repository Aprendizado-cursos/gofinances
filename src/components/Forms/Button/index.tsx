import React from "react";
import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
    return (
        <Container {...rest}>
            <Title>{title}</Title>
        </Container>
    );
}
