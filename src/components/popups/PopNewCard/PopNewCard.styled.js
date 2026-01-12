import styled from "styled-components";

export const PopNewCardStyled = styled.div`
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;

  @media (max-width: 660px) {
    top: 70px;
  }

  &.target {
    display: block;
  }
`;

export const PopNewCardContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
`;

export const PopNewCardBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.modalBg};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid ${({ theme }) => theme.border};
  position: relative;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s, border-color 0.3s;

  @media (max-width: 660px) {
    border-radius: 0;
    padding: 20px 16px 32px;
  }
`;

export const PopNewCardContent = styled.div`
  display: block;
  text-align: left;
`;

export const PopNewCardTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
`;

export const PopNewCardClose = styled.a`
  position: absolute;
  top: 20px;
  right: 30px;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

export const PopNewCardWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 660px) {
    display: block;
  }
`;

export const PopNewCardForm = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
`;

export const FormNewBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormNewInput = styled.input`
  width: 100%;
  outline: none;
  padding: 14px;
  background: ${({ theme }) => theme.inputBg};
  border: 0.7px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin: 20px 0;
  color: ${({ theme }) => theme.text};

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    color: ${({ theme }) => theme.placeholder};
  }
`;

export const FormNewArea = styled.textarea`
  width: 100%;
  outline: none;
  padding: 14px;
  background: ${({ theme }) => theme.inputBg};
  border: 0.7px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  max-width: 370px;
  margin-top: 14px;
  height: 200px;
  color: ${({ theme }) => theme.text};

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    color: ${({ theme }) => theme.placeholder};
  }

  @media (max-width: 495px) {
    height: 34px;
    max-width: 100%;
  }
`;

export const FormNewCreate = styled.button`
  width: 132px;
  height: 30px;
  background-color: ${({ theme }) => theme.accent};
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #ffffff;
  float: right;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};
  }

  @media (max-width: 495px) {
    width: 100%;
    height: 40px;
  }
`;

export const Categories = styled.div`
  margin-bottom: 20px;
`;

export const CategoriesP = styled.p`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.text};
`;

export const CategoriesThemes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const CategoriesTheme = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
  opacity: 0.4;

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
    color: ${({ theme }) => theme.text};
  }
`;

export const Subtitle = styled.label`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;