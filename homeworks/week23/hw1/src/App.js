import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Title,
  Wrapper,
  InputWrapper,
  FilterWrapper,
  TodosWrapper,
  TodoItemContainer,
  SubmitButton,
  FilteredButton,
  Input,
} from './style';

import {
  selectTodos,
  selectFilter,
  addTodo,
  deleteTodo,
  clearTodo,
  toggleIsDone,
  changeFilter,
  addTodosFromLocalStorage,
} from './components/Todo/todoSlice';
import Todo from './components/Todo/Todo';

function App() {
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const [value, setInputValue] = useState('');
  const dispatch = useDispatch();
  let TodoId = useRef(1);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem('todos'));
    if (storageTodos.length > 0) {
      dispatch(addTodosFromLocalStorage(storageTodos));
      TodoId.current = storageTodos[storageTodos.length - 1].id + 1;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    dispatch(addTodo({ content: value, id: TodoId.current }));
    TodoId.current++;
    setInputValue('');
  };

  const handleToggleIsDone = (id) => () => {
    dispatch(toggleIsDone(id));
  };

  const handleDelete = (id) => () => {
    dispatch(deleteTodo(id));
  };

  const handleClear = () => {
    dispatch(clearTodo());
  };

  const handleFilter = (filter) => () => {
    dispatch(changeFilter(filter));
  };

  return (
    <>
      <Title>Todo List</Title>
      <Wrapper>
        <InputWrapper>
          <form onSubmit={handleSubmit}>
            <Input value={value} onChange={handleInput}></Input>
            <SubmitButton type="submit">送出</SubmitButton>
          </form>
        </InputWrapper>
        <FilterWrapper>
          <FilteredButton onClick={handleFilter('all')}>全部</FilteredButton>
          <FilteredButton onClick={handleFilter('done')}>
            已完成
          </FilteredButton>
          <FilteredButton onClick={handleFilter('undone')}>
            未完成
          </FilteredButton>
          <FilteredButton onClick={handleClear}>清空所有任務</FilteredButton>
        </FilterWrapper>
        <TodosWrapper>
          <TodoItemContainer>
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
                  deleteTodo={handleDelete(todo.id)}
                  toggleIsDone={handleToggleIsDone(todo.id)}
                />
              ))}
          </TodoItemContainer>
        </TodosWrapper>
      </Wrapper>
    </>
  );
}

export default App;
