import React from "react";
import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName } from "./styles";

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
                </UserWrapper>
            </Header>
        </Container>
    );
}
