import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "./headers/light.js";

import lan_bg from 'images/orange-clip-paper-background-with-3d-note-paperclip-colorful-shade-concept-education-office-equipment-color-design-abstract-stationery-memo-paperwork-school-document-reminder-pattern-tool-set_79161-2403.avif';
import lpa from 'images/20210928_134904-1024x768.jpg';
import lpe from 'images/web_healthy_cooking_1376x774.png';

const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url(${lan_bg});
`;

const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`;
const Column = tw.div`mt-24 lg:w-1/2`;

const Card = tw.div`lg:mx-4 xl:mx-8 max-w-sm flex flex-col h-full`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-cover bg-center h-80 lg:h-64 rounded rounded-b-none `
]);

const Details = tw.div`p-6 rounded border-2 border-t-0 rounded-t-none border-dashed border-primary-500 flex-1 flex flex-col items-center text-center lg:block lg:text-left`;
const MetaContainer = tw.div`flex items-center`;
const Meta = styled.div`
  ${tw`text-secondary-100 font-medium text-sm flex items-center leading-none mr-6 last:mr-0`}
  svg {
    ${tw`w-4 h-4 mr-1`}
  }
`;

const Title = tw.h5`mt-4 leading-snug font-bold text-lg`;
const Description = tw.p`mt-2 text-sm text-secondary-100`;
const Link = styled(PrimaryButtonBase).attrs({as: "a"})`
  ${tw`inline-block mt-4 text-sm font-semibold`}
`

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
  const blogPosts = [
    {
      imageSrc:lpa,
      title: "For Our Partners",
      description: "Learn about the various tools, information and standard practices needed to become a partner of Atlanta Community Food Bank",
      url: "/learn_partners"
    },
    {
      imageSrc:lpe,
      title: "For our Community",
      description: "Gain knowledge and information on the cultural and nutritional value of different foods, recipes and cooking tips.",
      url: "/learn_people"
    }
  ];
  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
      <StyledHeader />
      <ThreeColumn>
          {blogPosts.map((post, index) => (
            <Column key={index}>
              <Card>
                <Image imageSrc={post.imageSrc} />
                <Details>
                  <Title>{post.title}</Title>
                  <Description>{post.description}</Description>
                  <Link href={post.url}>Start Learning</Link>
                </Details>
              </Card>
            </Column>
          ))}
        </ThreeColumn>
      </HeroContainer>
    </Container>
  );
};
