import styled, { css } from "styled-components/native";
import Feather from "react-native-vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";

interface IIconsProps {
    type: "up" | "down";
}

interface IContainerProps {
    isActive: boolean;
    type: "up" | "down";
}

export const Container = styled.TouchableOpacity<IContainerProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: ${({ isActive }) => (isActive ? 0 : 1.5)}px solid ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    padding: 16px;

    ${({ isActive, type, theme }) =>
        isActive &&
        type === "up" &&
        css`
            background-color: ${theme.colors.success_light};
        `};

    ${({ isActive, type, theme }) =>
        isActive &&
        type === "down" &&
        css`
            background-color: ${theme.colors.attention_light};
        `};
`;

export const Icon = styled(Feather)<IIconsProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({ type, theme }) => (type === "up" ? theme.colors.success : theme.colors.attention)};
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;
