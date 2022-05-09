import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from "./styles";
import { SignInSocialButton } from "../../components/SignInSocialButton/index";
import { AuthContext } from "../../AuthContext";

interface SignInProps {}

export function SignIn({}: SignInProps) {
    const data = useContext(AuthContext)

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg width={RFValue(120)} height={RFValue(68)}></LogoSvg>
                    <Title>
                        Controle suas {"\n"}finanças de forma {"\n"}muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>Faça o seu login com{"\n"} uma das contas abaixo</SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />
                    <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
                </FooterWrapper>
            </Footer>
        </Container>
    );
}
