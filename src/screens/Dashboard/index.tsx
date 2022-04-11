import React from "react";
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
    Title
} from "./styles";

export function Dashboard() {
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
                <TransactionCard></TransactionCard>
            </Transactions>
        </Container>
    );
}
