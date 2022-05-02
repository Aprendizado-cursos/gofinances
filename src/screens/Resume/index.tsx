import React from "react";
import { HistoryCard } from "../../components/HistoryCard/Index";

import { Container, Header, Title } from "./styles";

interface ResumeProps {}

export function Resume({}: ResumeProps) {
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <HistoryCard color="red" title="Compras" amount="150,50"></HistoryCard>
        </Container>
    );
}
