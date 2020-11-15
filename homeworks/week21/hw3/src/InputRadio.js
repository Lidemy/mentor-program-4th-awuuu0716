import {
  Important,
  InputLabel,
  InputWrapper,
  RadioOption,
  RadiosWrapper,
} from './style/style';
import { IMPORTANT_ICON, TYPE_1, TYPE_2 } from './constants';

const InputRadio = ({ label, required, handleChange, value, name, type }) => (
  <InputWrapper>
    <InputLabel>{label}</InputLabel>
    {required && <Important $isInline={true}>{IMPORTANT_ICON}</Important>}
    <RadiosWrapper>
      <RadioOption
        type={type}
        name={name}
        value={TYPE_1}
        onChange={handleChange}
        required={required}
        checked={value === TYPE_1}
      />
      {TYPE_1}
    </RadiosWrapper>
    <RadiosWrapper>
      <RadioOption
        type={type}
        name={name}
        value={TYPE_2}
        required={required}
        onChange={handleChange}
        checked={value === TYPE_2}
      />
      {TYPE_2}
    </RadiosWrapper>
  </InputWrapper>
);

export default InputRadio;
