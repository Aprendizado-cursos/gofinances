import React from "react";
import { Control, Controller, FieldPath, FieldError } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input/index";
import { Container, Error } from "./styles";

interface InputProps<T> extends TextInputProps {
    control: Control<T>;
    name: FieldPath<T>;
    error?: FieldError;
}

export function InputForm<T>({ control, name, error, ...rest }: InputProps<T>) {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <Input {...rest} onChangeText={onChange} value={value as string} />
                )}
                name={name}
            />
            {error && <Error>{error.message}</Error>}
        </Container>
    );
}
