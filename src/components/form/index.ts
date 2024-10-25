import './form.scss';
import Block from '../../services/block';
import template from './form.hbs?raw';

interface FormProps {
  title?: string;
  type?: string;
  onSubmit: () => void;
}

export default class Form extends Block<FormProps | any> {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
