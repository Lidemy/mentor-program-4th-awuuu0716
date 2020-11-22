import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 100vw;
  padding-top: 100px;
  padding-bottom: 66px;
  background: #f0f0f0;
`;

export const Form = styled.form`
  display: block;
  width: 645px;
  padding: 54px 42px;
  border-top: 8px solid #fad312;
  margin: 0 auto;
  background: white;
  font-family: 微軟正黑體;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`;

export const FormTitle = styled.h1`
  margin: 0;
  margin-bottom: 36px;
  font-size: 36px;
  letter-spacing: -1.8px;
`;

export const Footer = styled.footer`
  width: 100vw;
  padding-top: 26px;
  padding-bottom: 21px;
  border-top: 3px solid #fad312;
  background: black;
  color: #999999;
  text-align: center;
  font-size: 13px;
  font-family: 微軟正黑體;
`;

export const FormDescription = styled.p`
  margin: 0;
  font-size: 14px;

  & + & {
    margin-top: 11px;
    margin-bottom: 22px;
  }
`;

export const Important = styled.div`
  display: ${(props) => (props.$isInline ? 'inline' : 'block')};
  color: #e74149;
`;

export const InputWrapper = styled.div`
  margin: 50px 0px;
`;

export const InputLabel = styled.label`
  display: inline-block;
  margin-bottom: 20px;
  font-size: 20px;
`;

export const InputField = styled.input`
  width: 287px;
  border: 1px solid #d0d0d0;
  display: block;
`;

export const RadioOption = styled.input`
  display: inline-block;
  margin-right: 8px;
`;

export const RadiosWrapper = styled.div`
  display: block;

  & + & {
    margin-top: 23px;
  }
`;

export const InputSubtitle = styled.p`
  margin: 0;
  margin-bottom: 24px;
  font-size: 14px;
`;

export const Submit = styled.button`
  display: block;
  width: 92px;
  height: 40px;
  margin-bottom: 21px;
  border: none;
  border-radius: 3px;
  background-color: #fad312;
  cursor: pointer;
`;
