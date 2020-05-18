import React from "react";
import styled from "styled-components";

type MessageInterface = {
  text: string;
  color: string;
};

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  color: ${(props) => props.color};
`;
const Message = ({ text, color }: MessageInterface) => (
  <Container>
    <Text color={color}>{text}</Text>
  </Container>
);

export default Message;
