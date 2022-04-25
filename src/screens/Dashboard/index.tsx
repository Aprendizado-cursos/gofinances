import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
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

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: "1",
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: { name: "Vendas", icon: "dollar-sign" },
            date: "13/04/2022",
            type: "positive",
        },
        {
            id: "2",
            title: "Pizza",
            amount: "R$ 59,90",
            category: { name: "Alimentação", icon: "coffee" },
            date: "13/04/2022",
            type: "negative",
        },
        {
            id: "3",
            title: "Aluguel apartamento",
            amount: "R$ 1.200,00",
            category: { name: "Casa", icon: "shopping-bag" },
            date: "13/04/2022",
            type: "negative",
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
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"></Icon>
                    </LogoutButton>
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
                    keyExtractor={({ id }) => id}
                    renderItem={(data) => <TransactionCard data={data.item} />}
                />
            </Transactions>
        </Container>
    );
}
