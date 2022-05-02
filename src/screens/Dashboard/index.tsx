import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Container,
    Header,
    HighlightCards,
    Icon,
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

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighLightProps {
    amount: string;
}

interface HighLightData {
    entries: HighLightProps;
    expenses: HighLightProps;
    total: HighLightProps;
}

export function Dashboard() {
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highLightData, setHighLightData] = useState<HighLightData>({
        entries: { amount: "0,00" },
        expenses: { amount: "0,00" },
        total: { amount: "0,00" },
    });
    const dataKey = "@gofinances:transactions";

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
        setHighLightData({
            entries: {
                amount: entriesSum.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
            },
            expenses: {
                amount: expenseSum.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
            },
            total: {
                amount: (entriesSum - expenseSum).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
            },
        });
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
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: "https://avatars.githubusercontent.com/u/39427966?v=4" }}></Photo>
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Leonardo</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"></Icon>
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount={highLightData.entries.amount}
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount={highLightData.expenses.amount}
                    lastTransaction="Última saída dia 03 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount={highLightData.total.amount}
                    lastTransaction="1 á 6 de abril"
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
        </Container>
    );
}
