import styled from "styled-components";

export const PopUserContainer = styled.div`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  position: absolute;
  top: 61px;
  right: 128px;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.modalBg};
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 100;
`;

export const PopUserName = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

export const PopUserMail = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

export const PopUserTheme = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  & p {
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }

  & input[type="checkbox"] {
    position: relative;
    width: 24px;
    height: 13px;
    border-radius: 100px;
    background: ${({ theme }) => theme.inputBg};
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  & input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.accent};
    transition: 0.5s;
  }

  & input:checked[type="checkbox"]::before {
    left: 12px;
  }
`;

export const PopUserButton = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  color: ${({ theme }) => theme.accent};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.accent};
  cursor: pointer;

  & a {
    color: ${({ theme }) => theme.accent};
  }

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};
    color: #ffffff;
  }
  &:hover a {
    color: #ffffff;
  }
`;