import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input/index";
import { Container } from "./styles";

interface InputProps extends TextInputProps {
    control: Control;
    name: string;
}

export function InputForm({ control, name, ...rest }: InputProps) {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <Input {...rest} onChangeText={onChange} value={value} />
                )}
                name={name}
            />
        </Container>
    );
}
