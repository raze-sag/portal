import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';


import { BodySmallBoldText, Column, Row, Style, CaptionText, Card, Circle, H4Text, BodyText, BodyBoldText, BodySmallText, MasterButton, ButtonText, H4LightText, HorizontalLine, OutlineButton, TextInput, Image, StyledModal, FadingBackground } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import RadioButton from "../../common/radio";
import Checkbox from "../../common/checkbox";

import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";


const OnboardingPage = () => {

    const welcomingMessage = () => {
        return (
            <>
                <Column alignItems='start'>
                    <H4Text>Welcome to Gaia-X</H4Text>
                    <BodyText>Create your account in a few steps and benefit of our secure and transparent Federated Catalogue.</BodyText>
                </Column>
            </>
        )
    }

    const buildStepCardView = ({ stage, title, subtitle, isActive }) => {
        return (
            <Padding vertical='12px' paddingTop={stage == 1 ? '0px' : ''}>
                <Card background='#fff' borderColor='#0' boxShadow={`0px ${isActive ? '3' : '2'}px 4px 0px rgb(29 36 48 / ${isActive ? '25' : '12'}%)`}>
                    <Padding vertical='12px' horizontal='10px'>
                        <Row alignItems='center'>
                            <Circle radius='44px' background={isActive ? '#000094' : '#E9E9E9'} borderColor='#0'>
                                <BodySmallBoldText color={isActive ? '#fff' : '#2A2A2A'}>{stage}</BodySmallBoldText>
                            </Circle>
                            <Padding horizontal='20px'>
                                <Column>
                                    <BodyBoldText>{title}</BodyBoldText>
                                    <BodySmallText>{subtitle}</BodySmallText>
                                </Column>
                            </Padding>
                            <Style flexGrow='1'></Style>
                            <Circle radius='8px' background={isActive ? '#6BB324' : '#E9E9E9'} borderColor='#0' />
                        </Row>
                    </Padding>
                </Card>
            </Padding>
        )
    }

    const stepsPane = () => {
        return (
            <>
                {buildStepCardView({ stage: '1', title: 'Customer or provider', subtitle: 'Step 1', })}
                {buildStepCardView({ stage: '2', title: 'Organization details', subtitle: 'Step 2' })}
                {buildStepCardView({ stage: '3', title: 'Confirmation email', subtitle: 'Step 3', isActive: true })}
                {buildStepCardView({ stage: '4', title: 'Email notification', subtitle: 'Step 4' })}
                <Row>
                    <Padding vertical='32px'><MasterButton disabled>Previous</MasterButton></Padding>
                    <Padding vertical='32px'><MasterButton>Next</MasterButton></Padding>
                </Row>
            </>
        )
    }

    const customerOrProviderView = () => {
        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Do you want to register as a customer or provider?</H4LightText>
                            <ButtonText color='#00A2E4'>Learn more</ButtonText>
                            <HorizontalLine />
                            <Padding vertical='40px'>
                                <Column>
                                    <RadioButton name='step1'><BodyText>Customer</BodyText></RadioButton>
                                    <RadioButton name='step1'><BodyText>Provider</BodyText></RadioButton>
                                </Column>
                            </Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }


    const organizationDetailsView = () => {
        const [isChecked, setIsChecked] = useState(false);

        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Do you want to register as a customer or provider?</H4LightText>
                            <ButtonText color='#00A2E4'>Learn more</ButtonText>
                            <HorizontalLine />
                            <Padding vertical='24px'>
                                <Column>
                                    <BodyText>Please upload your organization details or select express registration via DID.</BodyText>
                                    <Padding vertical='16px' alignSelf='start'><OutlineButton>Upload</OutlineButton></Padding>
                                    <Padding vertical='16px' />
                                    <TextInput type="text" placeholder="Organization Name" />
                                    <Padding vertical='4px' />
                                    <TextInput type="text" placeholder="Email" />
                                    <Padding vertical='8px' />
                                    {/* Checkbox */}
                                    <Row alignItems='center'>
                                        <label>
                                            <Checkbox
                                                checked={isChecked}
                                                onChange={(event) => { setIsChecked(event.target.checked) }}
                                            />
                                        </label>
                                        <Padding horizontal='4px' />
                                        <BodyText>Apply for AISBL Membership</BodyText>
                                        <Padding horizontal='7px' />
                                        <Image objectFit='contain' src='/images/question-mark.svg' />
                                    </Row>

                                    <Padding vertical='28px'>
                                        <Row>
                                            <OutlineButton>Registration via DID</OutlineButton>
                                            <Padding horizontal='10px' />
                                            <OutlineButton>Send</OutlineButton>
                                        </Row>
                                    </Padding>
                                </Column>
                            </Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }

    const confirmationEmailView = () => {
        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Almost done</H4LightText>
                            <BodyText>Please upload your organization details or select express registration via DID.</BodyText>
                            <ButtonText color='#00A2E4'>Resend confirmation link</ButtonText>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }

    const verifyQrView = () => {
        return <>
            <ModalProvider backgroundComponent={FadingBackground}>
                <Style width='633px' height='246px'>
                    <Padding horizontal='20px'>
                        <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                            <Padding horizontal='24px'>
                                <H4LightText>Please verify yourselft as employee of your organization.</H4LightText>
                                <HorizontalLine />
                                <Column justifyContent='center' alignItems='center'>
                                    <Padding vertical='8px'>
                                        <Image src='/images/QRCode.png' width='200px' />
                                    </Padding>
                                    <Padding vertical='20px'>
                                        <Row alignItems='space-between'>
                                            <OutlineButton disabled>I don&#39;t have a DID</OutlineButton>
                                            <Padding horizontal='8px' />
                                            <FancyModalButton />
                                        </Row>
                                    </Padding>
                                    <Padding vertical='20px'></Padding>
                                </Column>
                            </Padding>
                        </Card>
                    </Padding>
                </Style>
            </ModalProvider>

        </>
    }

    function FancyModalButton() {
        const [isOpen, setIsOpen] = useState(false);
        const [opacity, setOpacity] = useState(0);

        function toggleModal(e) {
            setOpacity(0);
            setIsOpen(!isOpen);
        }

        function afterOpen() {
            setTimeout(() => {
                setOpacity(1);
            }, 100);
        }

        function beforeClose() {
            return new Promise((resolve) => {
                setOpacity(0);
                setTimeout(resolve, 300);
            });
        }

        return (
            <div>
                <OutlineButton onClick={toggleModal}>Contine</OutlineButton>
                <StyledModal
                    isOpen={isOpen}
                    afterOpen={afterOpen}
                    beforeClose={beforeClose}
                    onBackgroundClick={toggleModal}
                    onEscapeKeydown={toggleModal}
                    opacity={opacity}
                    backgroundProps={{ opacity }}
                >
                    {dontHaveDidView()}
                </StyledModal>
            </div>
        );
    }


    const dontHaveDidView = () => {
        const buildIdentifyServiceProvider = ({ background = '#fff' }) => {
            return (
                <Padding vertical='8px'>
                    <Card background={background} borderColor='#E9E9E9'>
                        <Padding vertical='4px' horizontal='16px'>
                            <Row>
                                <Circle radius='56px' borderColor='#0' background='#C4C4C4'>LOGO</Circle>
                                <Padding paddingLeft='16px' />
                                <ButtonText color='#000000'>Identify Service Provider 1</ButtonText>
                                <Style flexGrow='1' />
                                <ButtonText color='#00A2E4'>Link</ButtonText>
                            </Row>
                        </Padding>
                    </Card>
                </Padding>
            )
        }
        return <>
            <Style width='633px'>
                <Padding>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px' vertical='12px'>
                            <H4LightText>Don’t have a DID?</H4LightText>
                            <BodyText>Please select a idSP to create DID</BodyText>
                            <HorizontalLine />
                            {buildIdentifyServiceProvider({ background: '#46DAFF1F' })}
                            {buildIdentifyServiceProvider({ background: '#fff' })}
                            {buildIdentifyServiceProvider({ background: '#fff' })}
                            {buildIdentifyServiceProvider({ background: '#fff' })}

                            <Padding paddingTop='32px'>
                                <Row><OutlineButton>Close</OutlineButton></Row>
                            </Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }


    const credentialsMissingView = () => {
        return <>
            <Style width='633px'>
                <Padding>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px' vertical='12px'>
                            <H4LightText>Credentials are missing</H4LightText>
                            <BodyText>Lorem ipsum dolor si jet.</BodyText>
                            <HorizontalLine />
                            <BodyText>We couldn&#39;t find any authorized credentials. Please contact your organization.</BodyText>
                            <Padding vertical='20px'><Row><OutlineButton>Continue</OutlineButton></Row></Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }

    const organizationFillDetailsView = () => {

        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Organization details</H4LightText>
                            <BodyText>Lorem ipsum dolor si jet .</BodyText>
                            <HorizontalLine />
                            <Padding vertical='12px'>
                                <Column>
                                    <TextInput type="text" placeholder="Organization Name" />
                                    <Padding vertical='4px' />
                                    <TextInput type="text" placeholder="Email" />
                                    <Padding vertical='8px' />
                                    <TextInput type="text" placeholder="Phone" />
                                    <Padding vertical='8px' />
                                    <TextInput type="text" placeholder="City" />
                                    <Padding vertical='8px' />
                                    <TextInput type="text" placeholder="Address" />
                                    <Padding vertical='8px' />
                                    <TextInput type="text" placeholder="Zip Code" />
                                    <Padding vertical='28px'>
                                        <Row>
                                            <OutlineButton>Registration via DID</OutlineButton>
                                            <Padding horizontal='10px' />
                                            <OutlineButton>Send</OutlineButton>
                                        </Row>
                                    </Padding>
                                </Column>
                            </Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }

    const complienceCheckMessageView = () => {
        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Complience Check</H4LightText>
                            <BodyText color='#818C99'>Your onboarding request will be checked by the AISBL. This may take  some time. Please enter your email address to recieve status updates of your onboarding. </BodyText>
                            <HorizontalLine />
                            <Padding vertical='8px' />
                            <TextInput type="text" placeholder="Email" />
                            <Padding vertical='32px' />
                        </Padding>

                    </Card>
                </Padding>
            </Style>
        </>
    }

    return <>
        <Row>
            <Column>
                {welcomingMessage()}
                <Padding vertical='64px'>
                    <Row>
                        <Style width='307px'>{stepsPane()}</Style>
                        {complienceCheckMessageView()}
                    </Row>
                </Padding>
            </Column>

        </Row>
    </>;

}

OnboardingPage.propTypes = {
    type: PropTypes.string
}

export default OnboardingPage;