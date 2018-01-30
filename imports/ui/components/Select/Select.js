import React from 'react';
import PropTypes from 'prop-types';
import ClsNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import MUISelect from 'material-ui/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const Select = props => {
  const {
    className,
    classes,
    field, // { name, value, onChange, onBlur }
    form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    helperText,
    options,
    ...propsRest
  } = props;

  const {name, value, onChange, onBlur} = field;

  const hasError = errors && !!errors[name] && !!touched[name];

  return (
    <FormControl
      className={ClsNames(classes.formControl, className)}
      error={hasError}
    >
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <MUISelect
        native
        value={value}
        onChange={onChange}
        input={<Input id={name} />}
      >
        {options &&
          options.map(({value, name}, k) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
      </MUISelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {hasError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default withStyles(styles)(Select);
