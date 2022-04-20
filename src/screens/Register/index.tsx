import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
    name: string;
    amount: number;
}

const formSchema = yup.object({
    name: yup.string().required("Nome é obrigatório."),
    amount: yup
        .number()
        .typeError("Informe um valor numérico.")
        .positive("O valor deve ser positivo.")
        .required("Preço é obrigatório"),
});

export function Register() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(formSchema) });

    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });
    const [transactionType, setTransactionType] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleSelectTransactionTypeSelect(type: "up" | "down") {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    const handleRegister: SubmitHandler<FormData> = (values) => {};

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            placeholder="Nome"
                            name="name"
                            control={control}
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name}
                        />
                        <InputForm
                            placeholder="Preço"
                            name="amount"
                            control={control}
                            keyboardType="numeric"
                            error={errors.amount}
                        />
                        <TransactionsType>
                            <TransactionTypeButton
                                title="Income"
                                type="up"
                                onPress={() => handleSelectTransactionTypeSelect("up")}
                                isActive={transactionType === "up"}></TransactionTypeButton>
                            <TransactionTypeButton
                                title="Outcome"
                                type="down"
                                onPress={() => handleSelectTransactionTypeSelect("down")}
                                isActive={transactionType === "down"}></TransactionTypeButton>
                        </TransactionsType>
                        <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
                    </Fields>

                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}
