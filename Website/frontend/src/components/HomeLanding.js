import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "./headers/light.js";
import { Link } from 'react-router-dom';
import lan_bg from 'images/hand-drawn-food-bank-illustration_23-2149323304.avif';

const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url(${lan_bg});
`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-left md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const SubmitButton = tw(PrimaryButtonBase)`inline-block lg:ml-6 mt-6 lg:mt-0`
const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-white opacity-75`;
const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}

  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
export default ({
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
      <StyledHeader />
      <TwoColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {"Route Optimization" && <Subheading>{"Route Optimization"}</Subheading>}
            <Heading>{<>Deliver hope and meals <span tw="text-primary-500">faster </span><wbr/>with optimized delivery routes.</>}</Heading>
            <br/>
            <Link to="/route">
            <SubmitButton type="submit">{"Explore"}</SubmitButton>
            </Link>
          </TextContent>
        </TextColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {"Learning Center" && <Subheading>{"Learning Center"}</Subheading>}
            <Heading>{<>Empowering communities with <span tw="text-primary-500">knowledge</span> to fight food insecurity.</>}</Heading>
            <br/>
            <SubmitButton type="submit">{"Explore"}</SubmitButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
      </HeroContainer>
    </Container>
  );
};
