import styled from "styled-components";

export const themes = {
  webdesign: {
    background: "#ffc57dff",
    color: "#ff6d00",
  },
  research: {
    background: "#9efac3ff",
    color: "#06b16e",
  },
  copywriting: {
    background: "#d6b0ffff",
    color: "#9a48f1",
  },
  gray: {
    background: "#94a6be",
    color: "#ffffff",
  },
};

export const CardItem = styled.div`
  padding: 5px;
  animation-name: card-animation;
  animation-duration: 500ms;
  animation-timing-function: linear;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease;
  }
`;

export const CardWrapper = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  transition: background-color 0.3s, color 0.3s;

  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 130px;
  }
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  background-color: ${(props) =>
    themes[props.theme]?.background || themes.gray.background};
  color: ${(props) => themes[props.theme]?.color || themes.gray.color};

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
    color: inherit;
  }
`;

export const CardButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.mutedText};
  }
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
  transition: color 0.3s;
`;

export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${({ theme }) => theme.mutedText};
    letter-spacing: 0.2px;
    transition: color 0.3s;
  }
`;