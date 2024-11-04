import './form-field.scss';
import Block from '../../services/block';
import template from './form-field.hbs?raw';

import { VALIDATION_RULES, VALIDATION_ERRORS } from '../../services/validation';

interface FormFieldProps {
  value : string;
  error : string | null;
  onBlur?: () => void;
}

export default class FormField extends Block<FormFieldProps|any> {
  constructor(props: FormFieldProps) {
    super({
      ...props,
      error: null,
      onBlur: () => this.validate(),
    });
  }

  private _value() {
    return (this.refs.input.element! as HTMLInputElement).value;
  }

  private conditionCheck() {
    return VALIDATION_RULES[(this.refs.input.element! as HTMLInputElement).name].test((this.refs.input.element! as HTMLInputElement).value);
  }

  public value() {
    if (!this.validate()) {
      return 'Validation Failed';
    }
    return this._value();
  }

  public validate(): boolean {
    if (!this.conditionCheck()) {
      this.refs.errorMessage.setProps({
        ...this.props,
        value: this._value(),
        error: VALIDATION_ERRORS[(this.refs.input.element! as HTMLInputElement).name],
      });
      return false;
    }

    this.refs.errorMessage.setProps({
      ...this.props,
      value: this._value(),
      error: null,
    });
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
