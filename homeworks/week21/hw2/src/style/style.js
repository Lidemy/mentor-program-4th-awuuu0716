import styled from 'styled-components';
import { WHITE_CHESS, BLACK_CHESS, CHESS_SHADOW } from './constants';

export const BoardImg = styled.img`
  display: block;
  width: 860px;
`;

export const BoardContainer = styled.div`
  position: relative;
  display: block;
  width: 1000px;
  margin: 0 400px;
`;

export const Square = styled.div`
  position: absolute;
  top: ${(props) => props.$coordY}px;
  left: ${(props) => props.$coordX}px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  background: ${(props) => {
    if (props.$color === 'none') return 'transparent';
    return props.$color === 'black' ? BLACK_CHESS : WHITE_CHESS;
  }};
  box-shadow: ${(props) => (props.$color === 'none' ? 'none' : CHESS_SHADOW)};
`;

export const TitleWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 35%;
  color: #232323;
  font-size: 32px;
  font-weight: bold;
  user-select: none;
`;

export const OptionBtn = styled.button`
  border: none;
  background: transparent;
  box-shadow: 1px 1px 3px #b19556;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 10px;
  display: inline-block;
  color: #232323;
  cursor: pointer;
  outline: none;
  transform: translate(236px, 0px);
  transition: color 0.1s ease-in-out;
  &:hover {
    color: red;
  }
`;

export const Player = styled.span`
  display: inline-block;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${(props) =>
    props.$player === 'black' ? BLACK_CHESS : WHITE_CHESS};
  box-shadow: ${CHESS_SHADOW};
  transform: translate(10px, 4px);
`;

export const DashBoard = styled.div`
  position: absolute;
  display: flex;
  padding-bottom: 10px;
  flex-direction: column;
  align-items: center;
  top: 0px;
  right: ${(props) => props.$right};
  width: 250px;
  max-height: 60vh;
  overflow: auto;
  color: #232323;
  border: 1px solid #232323;
`;

export const DashBoardTitle = styled.h1``;
