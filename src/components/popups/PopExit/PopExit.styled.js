import styled from "styled-components";

export const PopExitStyle = styled.div`
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;

  &.target {
    display: block;
  }
`;

export const PopExitContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

export const PopExitBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.modalBg};
  max-width: 370px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid ${({ theme }) => theme.border};
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  transition: background-color 0.3s, border-color 0.3s;

  @media only screen and (max-width: 375px) {
    padding: 50px 20px;
  }
`;

export const PopExitTitle = styled.div`
  & h2 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.4px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.text};
    transition: color 0.3s;
  }
`;

export const PopExitForm = styled.form``;

export const PopExitFormGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 375px) {
    display: block;
  }
`;

export const PopExitYesButton = styled.button`
  width: 153px;
  height: 30px;
  background-color: ${({ theme }) => theme.accent};
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};
  }

  @media only screen and (max-width: 375px) {
    width: 100%;
    height: 40px;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export const PopExitNoButton = styled.button`
  width: 153px;
  height: 30px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 4px;
  border: 0.7px solid ${({ theme }) => theme.accent};
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
    color: #ffffff;
  }

  @media only screen and (max-width: 375px) {
    width: 100%;
    height: 40px;
  }
`;