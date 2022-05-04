import React, { useEffect } from "react";
import { HistoryCard } from "../../components/HistoryCard/Index";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container, Header, Title, Content, ChartContainer } from "./styles";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

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
    totalFormatted: string;
    total: number;
    color: string;
    percent: string;
}

interface ResumeProps {}

export function Resume({}: ResumeProps) {
    const [totalByCategories, setTotalByCategories] = React.useState<CategoryData[]>([]);
    const theme = useTheme();

    async function loadData() {
        const dataKey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted: TransactionData[] = response ? JSON.parse(response) : [];

        const expenses = responseFormatted.filter((expense) => expense.type === "negative");

        const expensesTotal = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

        const totalByCategory: CategoryData[] = [];

        categories.forEach((category) => {
            let categorySum = 0;

            expenses.forEach((expense) => {
                if (expense.category === category.key) {
                    categorySum += parseFloat(expense.amount);
                }
            });

            const percent = `${((categorySum / expensesTotal) * 100).toFixed(0)}%`;

            if (categorySum > 0)
                totalByCategory.push({
                    name: category.name,
                    totalFormatted: categorySum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                    total: categorySum,
                    color: category.color,
                    key: category.key,
                    percent: percent,
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
                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        x="percent"
                        y="total"
                        colorScale={categories.map((category) => category.color)}
                        style={{
                            labels: { fontSize: RFValue(18), fontWeight: "bold", fill: theme.colors.shape },
                        }}
                        labelRadius={50}
                    />
                </ChartContainer>

                {totalByCategories.map((category) => (
                    <HistoryCard
                        key={category.key}
                        color={category.color}
                        title={category.name}
                        amount={category.totalFormatted}></HistoryCard>
                ))}
            </Content>
        </Container>
    );
}
