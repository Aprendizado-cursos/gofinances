import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Forms/Button";
import { categories } from "../../utils/categories";

import { Container, Header, Title, Category, Icon, Name, Separator, Footer, ButtonText } from "./styles";

interface Category {
    key: string;
    name: string;
}

interface CategorySelectProps {
    category: Category;
    setCategory: (name: string) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({ category, setCategory, closeSelectCategory }: CategorySelectProps) {
    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>
            <FlatList
                data={categories}
                style={{ flex: 1, width: "100%" }}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) => (
                    <Category>
                        <Icon name={item.icon}></Icon>
                        <Name>{item.name}</Name>
                    </Category>
                )}
            />
            <Footer>
                <Button title="Selecionar" />
            </Footer>
        </Container>
    );
}
