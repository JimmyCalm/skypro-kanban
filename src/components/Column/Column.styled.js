import styled from "styled-components";

export const ColumnWrapper = styled.div.attrs((props) => ({
  $title: undefined,
  $cards: undefined,
  key: undefined,
}))`
  margin: 0 auto;
  display: block;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

export const ColumnTitle = styled.div.attrs((props) => ({
  key: undefined,
}))`
  padding: 0 5px;
  margin: 15px 0;

  p {
    min-width: 220px;
    color: ${({ theme }) => theme.mutedText};
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    transition: color 0.3s;
  }
`;

export const CardsContainer = styled.div.attrs((props) => ({
  key: undefined,
}))`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1200px) {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 10px;

    & > * {
      flex: 0 0 auto;
    }
  }
`;