import { TodoCard, ButtonOption, TodoContent } from './style';

const Todo = ({ content, isDone, handleDeleteBtn, handleToggleIsDoneBtn }) => (
  <TodoCard>
    <TodoContent>{content}</TodoContent>
    <div>
      <ButtonOption onClick={handleToggleIsDoneBtn}>
        {isDone ? '未完成' : '已完成'}
      </ButtonOption>
      <ButtonOption onClick={handleDeleteBtn}>刪除</ButtonOption>
    </div>
  </TodoCard>
);

export default Todo;
