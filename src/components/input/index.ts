import Block from '../../services/block';
import template from './input.hbs?raw';
import './input.scss';

interface InputProps {
  id: string;
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

export default class Input extends Block<InputProps | any> {
  constructor(props: InputProps) {
    super({
      events: {
        blur: props?.onBlur,
        change: props?.onChange,
        focus: props?.onFocus,
        input: props?.onInput,
      },
      id: props.id,
      name: props.name,
      style: props.style,
      type: props.type,
      value: props.value,
      placeholder: props.placeholder,
      className: props.className,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
