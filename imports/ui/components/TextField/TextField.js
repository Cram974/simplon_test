import React from 'react';
import MUITextField from 'material-ui/TextField';

const TextField = props => {
  const {
    field, // { name, value, onChange, onBlur }
    form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...propsRest
  } = props;

  const {name, value = '', onChange, onBlur} = field;

  const hasError = errors && !!errors[name] && !!touched[name];

  return (
    <MUITextField
      error={hasError}
      helperText={hasError && errors[name]}
      inputProps={{onBlur}}
      value={value}
      name={name}
      onChange={onChange}
      {...propsRest}
    />
  );
};

export default TextField;
