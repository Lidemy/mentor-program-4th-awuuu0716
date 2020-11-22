import { DashBoard, DashBoardTitle } from './style/style';

const History = ({ history, returnBtn }) => (
  <DashBoard $right="-150px">
    <DashBoardTitle>Match History</DashBoardTitle>
    {history.map((historyData, index) => {
      return (
        <div key={index}>
          Step: {index + 1}
          <button onClick={returnBtn(index + 1)}>Go Back</button>
        </div>
      );
    })}
  </DashBoard>
);

export default History;
