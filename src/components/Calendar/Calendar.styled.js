import styled from "styled-components";

export const CalendarContainer = styled.div`
  width: 182px;
  margin-bottom: 20px;
`;

export const CalendarTitle = styled.p`
  margin-bottom: 14px;
  padding: 0 7px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const CalendarBlock = styled.div`
  display: block;
`;

export const CalendarMonth = styled.div`
  color: ${({ theme }) => theme.mutedText};
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
`;

export const CalendarContent = styled.div`
  margin-bottom: 12px;
`;

export const CalendarDaysNames = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
`;

export const CalendarDayName = styled.div`
  color: ${({ theme }) => theme.mutedText};
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;

  &.weekend {
    color: ${({ theme }) => theme.mutedText};
  }
`;

export const CalendarCells = styled.div`
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;
`;

export const CalendarCell = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.mutedText};
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  transition: all 0.2s ease;

  &.other-month {
    opacity: 0.3;
  }

  &.weekend {
    color: ${({ theme }) => theme.mutedText};
  }

  &.current {
    font-weight: 700;
    color: ${({ theme }) => theme.text};
  }

  &.active-day {
    background-color: ${({ theme }) => theme.accent};
    color: #ffffff;
    font-weight: 500;
  }

  &:hover:not(.active-day):not(.other-month) {
    background-color: ${({ theme }) => theme.hoverBg};
    color: ${({ theme }) => theme.text};
  }

  &.hovered:not(.active-day):not(.other-month) {
    background-color: ${({ theme }) => theme.hoverBg2};
    color: ${({ theme }) => theme.text};
  }
`;

export const CalendarNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavAction = styled.div`
  width: 18px;
  height: 25px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover:not([disabled]) {
    background-color: ${({ theme }) => theme.hoverBg};
    border-radius: 4px;
  }

  svg {
    fill: ${({ theme }) => theme.mutedText};
  }
`;

export const CalendarPeriod = styled.div`
  padding: 0 7px;
`;

export const CalendarText = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 10px;
  line-height: 1;

  span {
    color: ${({ theme }) => theme.text};
  }

  &.date-end {
    font-weight: 500;
  }
`;