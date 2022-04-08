import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
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
            <HighlightCards >
                <HighlightCard></HighlightCard>
                <HighlightCard></HighlightCard>
                <HighlightCard></HighlightCard>
            </HighlightCards>
        </Container>
    );
}
