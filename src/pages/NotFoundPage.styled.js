import styled from "styled-components";
import { Link } from "react-router-dom";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-family: "Roboto", sans-serif;
  text-align: center;
`;

export const NotFoundTitle = styled.h1`
  font-size: 128px;
  margin-bottom: 0.1em;
  color: ${({ theme }) => theme.accent};
  font-weight: 700;
`;

export const NotFoundText = styled.p`
  font-size: 18px;
  margin-bottom: 2em;
  color: ${({ theme }) => theme.textSecondary};
`;

export const NotFoundLink = styled(Link)`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.linkText || "#ffffff"};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};
  }
`;