import Block from '../../services/block';
import template from './ChatForm.hbs?raw';
import './ChatForm.scss';

interface FormProps {
    title?: string;
    type?: string;
    customStyle?: string;
    onSubmit: () => void;
}

export class ChatForm extends Block<FormProps | any> {
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
