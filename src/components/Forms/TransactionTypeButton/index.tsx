import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

interface TransactionTypeButtonProps extends TouchableOpacityProps {
    title: string;
    type: "down" | "up";
    isActive: boolean;
}

const icons = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
};

export function TransactionTypeButton({ title, isActive, type, ...rest }: TransactionTypeButtonProps) {
    return (
        <Container isActive={isActive} type={type} {...rest}>
            <Icon type={type} name={icons[type]}></Icon>
            <Title>{title}</Title>
        </Container>
    );
}
