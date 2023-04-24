import React, { useState } from 'react';
import tw from "twin.macro";
import styled from "styled-components";
import {ReactComponent as SvgDotPatternIcon} from "../images/dot-pattern.svg"
import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from "./headers/light.js";
import lan_bg from 'images/Best-Route-Optimization-Software.jpg';
import { route_optimization } from './BackendFunction';
import route_img from 'images/route.png';

const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url(${lan_bg});
`;
const Content = tw.div``;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-yellow-100 rounded-lg relative text-center`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-white text-base font-medium tracking-wide border-b-2 py-2 text-white hocus:border-yellow-100 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-white`}
    }
  }
  
`;

const FormContainer_2 = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-yellow-100 rounded-lg relative text-center h-96 overflow-y-scroll`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-white text-base font-medium tracking-wide border-b-2 py-2 text-white hocus:border-yellow-100 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-white`}
    }
  }
  
`;

const FormContainer_3 = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-yellow-100 rounded-lg relative text-center`} 
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-40 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`
const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-white opacity-50`;
const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}

  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-cover bg-center h-96 lg:h-128 rounded rounded-b-none `
]);

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [partner, setPartner] = useState('');
  const [order, setOrder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      partner,
      order,
    };
    setTodos([...todos, newTodo]);
    setPartner('');
    setOrder('');
  };

  const handleSubmitRoute = (e) => {
    e.preventDefault();
    
    const input = {
      input: todos
    }
  
    route_optimization(input).then(res => {
      if (!res.error) {
        console.log(res);
      }
    })
  };
  
  return (
    <>
    <Container>
      <OpacityOverlay/>
    <HeroContainer>
    <StyledHeader />
      <Content>
        
        <div tw="mx-auto max-w-4xl">
        <FormContainer>
            <h2>Route Optimization</h2>
            <h5>Deliver hope and meals faster with optimized delivery routes.</h5>
        </FormContainer>
        <br/>
        <br/>
            <TwoColumn>
              <Column>
                <FormContainer_2>
                
                <form onSubmit={handleSubmit}>
                  <InputContainer>
                    <Label htmlFor="name">Partner Name</Label>
                    <Input id="name" value={partner} type="text" name="name" onChange={(e) => setPartner(e.target.value)} placeholder="E.g. Partner Name" />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" value={order} type="text" name="quantity" onChange={(e) => setOrder(e.target.value)} placeholder="E.g. Quanity in pounds" />
                  </InputContainer>
                  <SubmitButton type="submit">Add Partner Order</SubmitButton>
                </form>
                
                </FormContainer_2>
              </Column>
            
                <Column>
                <FormContainer_2>
                <form onSubmit={handleSubmitRoute}>
                  <TwoColumn>
                    <Column>
                    <InputContainer><Label>Partner Name</Label></InputContainer>
                    
                    {todos.map((todo, index) => (
                    <InputContainer><Label>{todo.partner}</Label></InputContainer>
                  ))}
                    </Column>
                    <Column>
                    <InputContainer><Label>Quantity</Label></InputContainer>
                    {todos.map((todo, index) => (
                    <InputContainer><Label>{todo.order}</Label></InputContainer>
                  ))}
                    </Column>
                  </TwoColumn>
                  <SubmitButton type="submit">Find Optimized Route</SubmitButton>
                </form>
                </FormContainer_2>
                </Column>
              </TwoColumn>
            
          </div>
          <SvgDotPattern1 />
          
      </Content>
      
      </HeroContainer>
      
    </Container>
    <br/>
    <br/>
        <FormContainer_3>
          <img src={route_img} />
        </FormContainer_3>
    </>
  );
}

export default TodoList;