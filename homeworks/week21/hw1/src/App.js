import { useState, useRef } from 'react';
import {
  Title,
  Wrapper,
  InputWrapper,
  FilterWrapper,
  TodosWrapper,
  TodoCardContainer,
  ButtonSubmit,
  ButtonFilter,
  Input,
} from './style';
import Todo from './Todo';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [value, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  let TodoId = useRef(1);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    const content = value;
    if (!value) return;
    setTodos([
      ...todos,
      {
        content,
        isDone: false,
        id: TodoId.current,
      },
    ]);
    setInputValue('');
    TodoId.current++;
  };

  const handleToggleIsDoneBtn = (id) => () => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleDeleteBtn = (id) => () => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleFilterBtn = (filter) => () => {
    setFilter(filter);
  };

  const handleClearBtn = () => {
    setTodos([]);
  };

  return (
    <>
      <Title>Todo List</Title>
      <Wrapper>
        <InputWrapper>
          <form onSubmit={handleSubmitBtn}>
            <Input value={value} onChange={handleInput}></Input>
            <ButtonSubmit type="submit">送出</ButtonSubmit>
          </form>
        </InputWrapper>
        <FilterWrapper>
          <ButtonFilter onClick={handleFilterBtn('all')}>全部</ButtonFilter>
          <ButtonFilter onClick={handleFilterBtn('done')}>已完成</ButtonFilter>
          <ButtonFilter onClick={handleFilterBtn('undone')}>
            未完成
          </ButtonFilter>
          <ButtonFilter onClick={handleClearBtn}>清空所有任務</ButtonFilter>
        </FilterWrapper>
        <TodosWrapper>
          <TodoCardContainer>
            {todos
              .filter((todo) => {
                switch (filter) {
                  case 'all':
                    return true;
                  case 'done':
                    return todo.isDone;
                  case 'undone':
                    return !todo.isDone;
                  default:
                    return true;
                }
              })
              .map((todo) => (
                <Todo
                  content={todo.content}
                  isDone={todo.isDone}
                  key={todo.id}
                  handleDeleteBtn={handleDeleteBtn(todo.id)}
                  handleToggleIsDoneBtn={handleToggleIsDoneBtn(todo.id)}
                />
              ))}
          </TodoCardContainer>
        </TodosWrapper>
      </Wrapper>
    </>
  );
};

export default App;
