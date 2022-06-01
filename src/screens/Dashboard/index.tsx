import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Container,
    Header,
    HighlightCards,
    Icon,
    LoadContainer,
    LogoutButton,
    Photo,
    Title,
    TransactionList,
    Transactions,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
} from "./styles";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighLightProps {
    amount: string;
    lastTransaction: string;
}

interface HighLightData {
    entries: HighLightProps;
    expenses: HighLightProps;
    total: HighLightProps;
}

export function Dashboard() {
    const theme = useTheme();
    const { signOut, user } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highLightData, setHighLightData] = useState<HighLightData>({
        entries: { amount: "0,00", lastTransaction: "" },
        expenses: { amount: "0,00", lastTransaction: "" },
        total: { amount: "0,00", lastTransaction: "" },
    });
    const dataKey = `@gofinances:transactions_user:${user.id}`;

    function getLastTransactionData(collection: DataListProps[], type: "positive" | "negative") {
        const filteredCollection = collection.filter((item) => item.type === type);

        if (!filteredCollection.length) {
            return 0;
        }

        const result = new Date(
            Math.max.apply(
                Math,
                filteredCollection.map((item) => new Date(item.date).getTime())
            )
        );
        return `${result.getDate()} de ${result.toLocaleString("default", { month: "long" })}`;
    }

    async function loadTransaction() {
        const response = await AsyncStorage.getItem(dataKey);
        const transactions: DataListProps[] = response ? JSON.parse(response) : [];

        let entriesSum = 0;
        let expenseSum = 0;

        const transactionsFormatted = transactions.map((transaction) => {
            if (transaction.type === "positive") {
                entriesSum += Number(transaction.amount);
            } else {
                expenseSum += Number(transaction.amount);
            }

            const amount = Number(transaction.amount).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            });

            const date = Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }).format(new Date(transaction.date));

            return { ...transaction, amount, date };
        });

        setTransactions(transactionsFormatted);
        const lastTransactionsEntries = getLastTransactionData(transactions, "positive");
        const lastTransactionsExpenses = getLastTransactionData(transactions, "negative");
        const totalInterval = lastTransactionsExpenses === 0 ? "Não há transações" : `01 a ${lastTransactionsExpenses}`;

        setHighLightData({
            entries: {
                amount: entriesSum.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
                lastTransaction:
                    lastTransactionsEntries === 0
                        ? "Não há transações"
                        : `Última entrada dia ${lastTransactionsEntries}`,
            },
            expenses: {
                amount: expenseSum.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
                lastTransaction:
                    lastTransactionsEntries === 0 ? "Não há transações" : `Última saída dia ${lastTransactionsEntries}`,
            },
            total: {
                amount: (entriesSum - expenseSum).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
                lastTransaction: totalInterval,
            },
        });
        setIsLoading(false);
    }

    useEffect(() => {
        loadTransaction();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTransaction();
        }, [])
    );

    return (
        <Container>
            {isLoading ? (
                <LoadContainer>
                    <ActivityIndicator color={theme.colors.primary} size="large"></ActivityIndicator>
                </LoadContainer>
            ) : (
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: user.photo }}></Photo>
                                <User>
                                    <UserGreeting>Olá, </UserGreeting>
                                    <UserName>{user.name}</UserName>
                                </User>
                            </UserInfo>
                            <LogoutButton onPress={signOut}>
                                <Icon name="power"></Icon>
                            </LogoutButton>
                        </UserWrapper>
                    </Header>
                    <HighlightCards>
                        <HighlightCard
                            type="up"
                            title="Entradas"
                            amount={highLightData.entries.amount}
                            lastTransaction={highLightData.entries.lastTransaction}
                        />
                        <HighlightCard
                            type="down"
                            title="Saídas"
                            amount={highLightData.expenses.amount}
                            lastTransaction={highLightData.expenses.lastTransaction}
                        />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highLightData.total.amount}
                            lastTransaction={highLightData.total.lastTransaction}
                        />
                    </HighlightCards>
                    <Transactions>
                        <Title>Listagem</Title>
                        <TransactionList
                            data={transactions}
                            keyExtractor={({ id }) => id}
                            renderItem={(data) => <TransactionCard data={data.item} />}
                        />
                    </Transactions>
                </>
            )}
        </Container>
    );
}
