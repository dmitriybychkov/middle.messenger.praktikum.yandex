import './error-message.scss';
import Block from '../../services/block';
import template from './error-message.hbs?raw';

interface ErrorMessageProps extends Record<string, unknown> {
    style: string,
    error: string | null,
}

export default class ErrorMessage extends Block<ErrorMessageProps> {
  constructor(props: ErrorMessageProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
