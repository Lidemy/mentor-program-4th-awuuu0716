import { Player, TitleWrapper, OptionBtn } from './style/style';

const Title = ({ winner, player, restart }) => (
  <TitleWrapper>
    {winner ? 'Winner: ' : 'Player: '}
    <Player $player={winner || player} />
    <OptionBtn onClick={restart}>Restart</OptionBtn>
  </TitleWrapper>
);

export default Title;
