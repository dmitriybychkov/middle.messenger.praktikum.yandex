import Block from '../../services/block';
import template from './ChatInput.hbs?raw';
import './ChatInput.scss';

interface ChatInputProps {
    name: string;
    style: string;
    type: string;
    value?: string;
    placeholder?: string;
    className?: string;
    onBlur?: () => void;
    onChange?: () => void;
    onFocus?: () => void;
    onInput?: () => void;
}

export class ChatInput extends Block<ChatInputProps | any> {
  constructor(props: ChatInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        change: props.onChange,
        focus: props.onFocus,
        input: props.onInput,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
