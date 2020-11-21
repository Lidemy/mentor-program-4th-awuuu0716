import {
  TodoItem,
  DeleteButton,
  TodoContent,
  ToggleIsDoneButton,
} from '../../style';

const Todo = ({ content, isDone, deleteTodo, toggleIsDone }) => (
  <TodoItem>
    <TodoContent $isDone={isDone}>
      {isDone ? <s>{content}</s> : content}
    </TodoContent>
    <div>
      <ToggleIsDoneButton onClick={toggleIsDone} $isDone={isDone}>
        {isDone ? '切換成未完成' : '完成！'}
      </ToggleIsDoneButton>
      <DeleteButton onClick={deleteTodo}>刪除</DeleteButton>
    </div>
  </TodoItem>
);

export default Todo;
