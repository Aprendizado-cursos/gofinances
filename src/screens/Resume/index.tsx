import React, { useEffect } from "react";
import { HistoryCard } from "../../components/HistoryCard/Index";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container, Header, Title, Content } from "./styles";
import { categories } from "../../utils/categories";

interface TransactionData {
    name: string;
    amount: string;
    category: string;
    date: string;
    type: "positive" | "negative";
}

interface CategoryData {
    key: string;
    name: string;
    total: string;
    color: string;
}

interface ResumeProps {}

export function Resume({}: ResumeProps) {
    const [totalByCategories, setTotalByCategories] = React.useState<CategoryData[]>([]);

    async function loadData() {
        const dataKey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted: TransactionData[] = response ? JSON.parse(response) : [];

        const expenses = responseFormatted.filter((expense) => expense.type === "negative");

        const totalByCategory: CategoryData[] = [];

        categories.forEach((category) => {
            let categorySum = 0;

            expenses.forEach((expense) => {
                if (expense.category === category.key) {
                    categorySum += parseFloat(expense.amount);
                }
            });
            if (categorySum > 0)
                totalByCategory.push({
                    name: category.name,
                    total: categorySum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                    color: category.color,
                    key: category.key,
                });
        });

        setTotalByCategories(totalByCategory);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <Content>
                {totalByCategories.map((category) => (
                    <HistoryCard
                        key={category.key}
                        color={category.color}
                        title={category.name}
                        amount={category.total}></HistoryCard>
                ))}
            </Content>
        </Container>
    );
}
