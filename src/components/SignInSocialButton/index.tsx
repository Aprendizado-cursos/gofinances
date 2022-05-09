import React from "react";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

import { Container, ImageContainer, Text } from "./styles";

interface SignInSocialButtonProps extends TouchableOpacityProps {
    title: string;
    svg: React.FC<SvgProps>;
}

export function SignInSocialButton({ title, svg: Svg, ...rest }: SignInSocialButtonProps) {
    return (
        <Container {...rest}>
            <ImageContainer>
                <Svg></Svg>
            </ImageContainer>
            <Text>{title}</Text>
        </Container>
    );
}
