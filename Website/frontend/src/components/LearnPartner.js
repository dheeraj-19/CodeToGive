import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "./headers/light.js";
import lan_bg from 'images/orange-clip-paper-background-with-3d-note-paperclip-colorful-shade-concept-education-office-equipment-color-design-abstract-stationery-memo-paperwork-school-document-reminder-pattern-tool-set_79161-2403.avif';
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import i1 from 'images/download.png';
import i2 from 'images/about-umit-new-small.jpg';
import i3 from 'images/MediaandInformationLitteracy.png';
import i4 from 'images/infolit.jpg';
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url(${lan_bg});
`;


const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-white opacity-75`;
const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}

  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header_section = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

export default ({
  textOnLeft = true,
  heading = "Checkout the Tutorials",
  tabs = {
    Tools: [
      {
        imageSrc:i1,
        title: "Tool 1",
        content: "Description"
      },
      {
        imageSrc:i2,
        title: "Tool 2",
        content: "Description"
      },
      {
        imageSrc:i3,
        title: "Tool 3",
        content: "Description"
      },
      {
        imageSrc:i4,
        title: "Tool 4",
        content: "Description"
      }
    ],
    Information: [
        {
          imageSrc:i1,
          title: "Information 1",
          content: "Description"
        },
        {
          imageSrc:i2,
          title: "Information 2",
          content: "Description"
        },
        {
          imageSrc:i3,
          title: "Information 3",
          content: "Description"
        },
        {
          imageSrc:i4,
          title: "Information 4",
          content: "Description"
        }
      ],
    StandardPractices: [
        {
          imageSrc:i1,
          title: "Practice 1",
          content: "Description"
        },
        {
          imageSrc:i2,
          title: "Practice 2",
          content: "Description"
        },
        {
          imageSrc:i3,
          title: "Practice 3",
          content: "Description"
        },
        {
          imageSrc:i4,
          title: "Practice 4",
          content: "Description"
        }
      ],
    Forms: [
        {
          imageSrc:i1,
          title: "Form 1",
          content: "Description"
        },
        {
          imageSrc:i2,
          title: "Form 2",
          content: "Description"
        },
        {
          imageSrc:i3,
          title: "Form 3",
          content: "Description"
        },
        {
          imageSrc:i4,
          title: "Form 4",
          content: "Description"
        }
      ],
  }
}) => {

    const tabsKeys = Object.keys(tabs);
    const [activeTab, setActiveTab] = useState(tabsKeys[0]);
  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
      <StyledHeader />
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header_section>{heading}</Header_section>
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale:1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale:0.8,
                display: "none",
              }
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey].map((card, index) => (
              <CardContainer key={index}>
                <Card className="group" href={card.url} initial="rest" whileHover="hover" animate="rest">
                  <CardImageContainer imageSrc={card.imageSrc}>
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto"
                        },
                        rest: {
                          opacity: 0,
                          height: 0
                        }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardButton>Learn</CardButton>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardContent>{card.content}</CardContent>
                    <CardPrice>{card.price}</CardPrice>
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>
      </HeroContainer>
    </Container>
  );
};

/* This function is only there for demo purposes. It populates placeholder cards */
const getRandomCards = () => {
    const cards = [
      {
        imageSrc:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Chicken Chilled",
        content: "Chicken Main Course",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1582254465498-6bc70419b607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Samsa Beef",
        content: "Fried Mexican Beef",
        price: "$3.99",
        rating: "4.5",
        reviews: "34",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Carnet Nachos",
        content: "Chilli Crispy Nachos",
        price: "$3.99",
        rating: "3.9",
        reviews: "26",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Guacamole Mex",
        content: "Mexican Chilli",
        price: "$3.99",
        rating: "4.2",
        reviews: "95",
        url: "#"
      }
    ];
  
    // Shuffle array
    return cards.sort(() => Math.random() - 0.5);
  };
  