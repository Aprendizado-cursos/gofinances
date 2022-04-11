import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import {
    Container,
    HighlightCards,
    Header,
    Icon,
    Photo,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
    Transactions,
    Title,
    TransactionList,
} from "./styles";

export function Dashboard() {
    const data = [
        {
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: { name: "vendas", icon: "dollar-sign" },
            date: "13/04/2022",
        },
        {
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: { name: "vendas", icon: "dollar-sign" },
            date: "13/04/2022",
        },
        {
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: { name: "vendas", icon: "dollar-sign" },
            date: "13/04/2022",
        },
    ];

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
                    <Icon name="power"></Icon>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última saída dia 03 de abril"
                />
                <HighlightCard type="total" title="Total" amount="R$ 16.141,00" lastTransaction="1 á 6 de abril" />
            </HighlightCards>
            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                    contentContainerStyle={{ paddingBottom: getBottomSpace() }}></TransactionList>
            </Transactions>
        </Container>
    );
}
