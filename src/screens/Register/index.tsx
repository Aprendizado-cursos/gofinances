import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { Container, Header, Title, Form, Fields, TransactionsType } from "./styles";

export function Register() {
    const [transactionType, setTransactionType] = useState("");

    function handleSelectTransactionTypeSelect(type: "up" | "down") {
        setTransactionType(type);
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
                    <CategorySelect title="Categoria"></CategorySelect>
                </Fields>

                <Button title="Enviar"></Button>
            </Form>
        </Container>
    );
}
