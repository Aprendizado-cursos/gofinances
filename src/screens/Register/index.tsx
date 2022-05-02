import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

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
    const { navigate }: NavigationProp<ParamListBase> = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({ resolver: yupResolver(formSchema) });

    const dataKey = "@gofinances:transactions";

    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });
    const [transactionType, setTransactionType] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleSelectTransactionTypeSelect(type: "positive" | "negative") {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    const handleRegister: SubmitHandler<FormData> = async (values) => {
        try {
            const formData = {
                ...values,
                type: transactionType,
                category: category.key,
                date: new Date(),
                id: String(uuid.v4()),
            };
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const formattedData = [...currentData, formData];

            reset();
            setTransactionType("");
            setCategory({ key: "category", name: "Categoria" });

            await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

            navigate("Listagem");
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar.");
        }
    };

    useEffect(() => {
        async function getTransactions() {
            const data = await AsyncStorage.getItem(dataKey);
            console.log(JSON.parse(data!));
        }
        getTransactions();
    }, []);

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
                                onPress={() => handleSelectTransactionTypeSelect("positive")}
                                isActive={transactionType === "positive"}></TransactionTypeButton>
                            <TransactionTypeButton
                                title="Outcome"
                                type="down"
                                onPress={() => handleSelectTransactionTypeSelect("negative")}
                                isActive={transactionType === "negative"}></TransactionTypeButton>
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
