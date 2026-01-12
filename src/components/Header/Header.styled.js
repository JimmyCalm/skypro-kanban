import styled from "styled-components";

export const HeaderBlock = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.headerBg};
  transition: background-color 0.2s;
`;

export const HeaderContent = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 128px;

  @media screen and (max-width: 495px) {
    padding: 0 16px;
  }
`;

export const HeaderLogo = styled.div`
  img {
    width: 85px;
  }
`;

export const HeaderNav = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderButton = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.accent};
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  transition: background-color 0.3s;

  a {
    color: #ffffff;
  }

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};
  }

  @media screen and (max-width: 495px) {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    margin-right: 0;
  }
`;

export const HeaderUser = styled.a`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.accent};
  position: relative;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.accentHover};
  }

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid ${({ theme }) => theme.accent};
    border-bottom: 1.9px solid ${({ theme }) => theme.accent};
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
    transition: border-color 0.3s;
  }

  &:hover::after {
    border-left-color: ${({ theme }) => theme.accentHover};
    border-bottom-color: ${({ theme }) => theme.accentHover};
  }
`;