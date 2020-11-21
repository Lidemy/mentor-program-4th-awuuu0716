import {
  FormWrapper,
  Footer,
  Form,
  FormTitle,
  FormDescription,
  Important,
} from './style/style';
import { useState } from 'react';
import {
  FOOTER_TEXT,
  FORM_TITLE,
  FORM_REMARK,
  EVENT_DATE,
  EVENT_LOCATION,
  IMPORTANT_TEXT,
  INPUT_LABEL_NICKNAME,
  INPUT_LABEL_EMAIL,
  INPUT_LABEL_PHONE,
  INPUT_LABEL_INFORMED,
  INPUT_LABEL_TYPE,
  INPUT_LABEL_OTHERS,
  INPUT_OTHERS_SUBTITLE,
} from './constants';
import Input from './Input';
import InputRadio from './InputRadio';
import SubmitBtn from './SubmitBtn';

const App = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    phone: '',
    informed: '',
    others: '',
    type: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`報名成功！您的報名資料為：
暱稱：${formData.nickname}
電子郵件：${formData.email}
怎麼知道這個活動的：${formData.informed}
報名類型：${formData.type}
其他：${formData.others}
    `);
  };

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormTitle>{FORM_TITLE}</FormTitle>
          <FormDescription>{EVENT_DATE}</FormDescription>
          <FormDescription>{EVENT_LOCATION}</FormDescription>
          <Important $isInline={false}>{IMPORTANT_TEXT}</Important>
          <Input
            label={INPUT_LABEL_NICKNAME}
            required={true}
            value={formData.nickname}
            type={'text'}
            name={'nickname'}
            handleChange={handleChange}
          />
          <Input
            label={INPUT_LABEL_EMAIL}
            required={true}
            value={formData.email}
            type={'email'}
            name={'email'}
            handleChange={handleChange}
          />
          <Input
            label={INPUT_LABEL_PHONE}
            required={true}
            value={formData.phone}
            type={'number'}
            name={'phone'}
            handleChange={handleChange}
          />
          <InputRadio
            label={INPUT_LABEL_TYPE}
            required={true}
            value={formData.type}
            type={'radio'}
            name={'type'}
            handleChange={handleChange}
          ></InputRadio>
          <Input
            label={INPUT_LABEL_INFORMED}
            required={true}
            value={formData.informed}
            type={'text'}
            name={'informed'}
            handleChange={handleChange}
          />
          <Input
            label={INPUT_LABEL_OTHERS}
            required={false}
            subtitle={INPUT_OTHERS_SUBTITLE}
            value={formData.others}
            type={'text'}
            name={'others'}
            handleChange={handleChange}
          />
          <SubmitBtn />
          <FormDescription>{FORM_REMARK}</FormDescription>
        </Form>
      </FormWrapper>
      <Footer>{FOOTER_TEXT}</Footer>
    </>
  );
};

export default App;

