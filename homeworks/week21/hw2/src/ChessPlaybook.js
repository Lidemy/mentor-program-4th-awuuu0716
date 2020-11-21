import { DashBoard, DashBoardTitle } from './style/style';

const ChessPlaybook = ({ playbook }) => (
  <DashBoard $right="-440px">
    <DashBoardTitle>Chess Playbook</DashBoardTitle>
    {playbook.map((playbookData, index) => {
      return (
        <div key={index}>
          {index + 1}: {playbookData}
        </div>
      );
    })}
  </DashBoard>
);

export default ChessPlaybook;
