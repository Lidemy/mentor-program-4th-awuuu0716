import {
  Important,
  InputLabel,
  InputField,
  InputWrapper,
  InputSubtitle,
} from './style/style';
import { IMPORTANT_ICON } from './constants';

const Input = ({
  label,
  required,
  subtitle,
  value,
  handleChange,
  type,
  name,
}) => (
  <InputWrapper>
    <InputLabel>{label}</InputLabel>
    {required && <Important $isInline={true}>{IMPORTANT_ICON}</Important>}
    {subtitle && <InputSubtitle>{subtitle}</InputSubtitle>}
    <InputField
      required={required}
      value={value}
      onChange={handleChange}
      type={type}
      name={name}
    />
  </InputWrapper>
);

export default Input;
