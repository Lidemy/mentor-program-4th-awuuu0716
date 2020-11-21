import styled from 'styled-components';

export const Title = styled.h1`
  margin: 25px;
  font-size: 32px;
  text-align: center;
  font-family: 微軟正黑體;
`;

export const Wrapper = styled.div`
  width: 80vh;
  min-height: 70vh;
  margin: 0 auto;
  padding: 10px 0;
  border: 1px solid #fbfbfb;
  box-shadow: 1px 1px 2px #d8d8d8;
  font-family: 微軟正黑體;
`;
export const InputWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

export const FilterWrapper = styled.div`
  width: 80%;
  margin: 20px auto;
  text-align: center;
`;

export const TodosWrapper = styled.div`
  width: 80%;
  margin: 20px auto;
`;

export const TodoItemContainer = styled.ul`
  padding: 0;
`;

export const TodoItem = styled.li`
  display: flex;
  margin: 10px 0;
  padding: 5px;
  list-style: none;
  border: 1px solid #fbfbfb;
  justify-content: space-between;
  box-shadow: 1px 1px 2px #d8d8d8;
`;

export const Input = styled.input`
  border: 1px solid #eaeaea;
  font-size: 16px;
  outline: none;
`;

export const SubmitButton = styled.button`
  border: none;
  background: white;
  margin-left: 10px;
  font-size: 20px;
  box-shadow: 1px 1px 3px #d4d4d4;
  cursor: pointer;
  outline: none;
`;

export const FilteredButton = styled.button`
  border: none;
  background: white;
  font-size: 16px;
  box-shadow: 1px 1px 3px #d4d4d4;
  cursor: pointer;
  outline: none;

  & + & {
    margin-left: 5px;
  }
`;

export const DeleteButton = styled.button`
  border: none;
  background: white;
  font-size: 16px;
  box-shadow: 1px 1px 3px #d4d4d4;
  cursor: pointer;
  outline: none;

  & + & {
    margin-left: 5px;
  }
`;

export const ToggleIsDoneButton = styled.button`
  border: none;
  background: white;
  font-size: 16px;
  box-shadow: 1px 1px 3px #d4d4d4;
  cursor: pointer;
  outline: none;
  margin-right: 5px;
  color: ${(props) => (props.$isDone ? '#b2b2b2' : 'black')};
`;

export const TodoContent = styled.div`
  max-width: 70%;
  word-wrap: break-word;
  line-height: 1.5em;
  color: ${(props) => (props.$isDone ? '#b2b2b2' : 'black')};
`;
