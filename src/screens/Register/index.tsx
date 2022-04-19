import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { Container, Header, Title, Form, Fields, TransactionsType } from "./styles";
import { Modal } from "react-native";
import { CategorySelect } from "../CategorySelect";

export function Register() {
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

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input placeholder="Nome"></Input>
                    <Input placeholder="Preço"></Input>
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

                <Button title="Enviar"></Button>
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
