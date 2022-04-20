import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";

interface FormData{
    name: string;
    amount: number;
}

export function Register() {
    const { control, handleSubmit } = useForm();

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

    function handleRegister(form:FormData) {
        
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm placeholder="Nome" name="name" control={control}></InputForm>
                    <InputForm placeholder="Preço" name="amout" control={control}></InputForm>
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
    );
}
