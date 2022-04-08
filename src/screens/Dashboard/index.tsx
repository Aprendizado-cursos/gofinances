import React from "react";
import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon } from "./styles";
import { Feather } from "@expo/vector-icons";

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
        </Container>
    );
}
