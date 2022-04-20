import React from "react";
import { Control, Controller, FieldPath } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input/index";
import { Container } from "./styles";

interface InputProps<T> extends TextInputProps {
    control: Control<T>;
    name: FieldPath<T>;
}

export function InputForm<T>({ control, name, ...rest }: InputProps<T>) {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <Input {...rest} onChangeText={onChange} value={value as string} />
                )}
                name={name}
            />
        </Container>
    );
}
