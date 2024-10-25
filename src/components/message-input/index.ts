import './message-input.scss';
import Block from '../../services/block';
import template from './message-input.hbs?raw';

interface MessageInputProps extends Record<string, unknown> {
  placeholder: string,
  style: string,
  value: string | null,
  error: string | null,
  onBlur: () => void,
  onSend: (event: Event) => void,
  onFocus: () => void,
  events?: {
    submit?: (event: Event) => void,
    blur?: () => void,
    focus?: () => void,
  }
}

export default class MessageInput extends Block<MessageInputProps> {
  constructor(props: MessageInputProps) {
    super({
      ...props,
      error: null,
      placeholder: 'Введите сообщение',
      onBlur: () => {
        this.validate();
      },

      onSend: (event : Event) => {
        event.preventDefault();
        const { name } = this.refs.messageInput.element! as HTMLInputElement;
        const value = this.value();
        console.info({
          [name]: value,
        });

        if (this.validate()) {
          this.setProps({
            ...props,
            value: '',
            error: null,
            placeholder: 'Введите сообщение...',
          });
        }
      },
      onFocus: () => {
        this.refs.errorMessage.setProps({
          ...this.props,
          error: null,
        });
      },
    });
  }

  public validate(): boolean {
    if (!this.conditionCheck()) {
      this.refs.errorMessage.setProps({
        ...this.props,
        error: 'Пустое сообщение!',
      });
      this.refs.messageInput.setProps({
        ...this.props,
        placeholder: '',
        events: {
          focus: this.props.onFocus,
          blur: this.props.onBlur,
        },
      });
      return false;
    }

    this.refs.errorMessage.setProps({
      ...this.props,
      error: null,
    });
    return true;
  }

  private conditionCheck() {
    return this._value()?.length > 0;
  }

  private _value() {
    return (this.refs.messageInput.element as HTMLInputElement).value;
  }

  public value() {
    if (!this.validate()) {
      return 'Validation Failed';
    }
    return this._value();
  }

  render() {
    return this.compile(template, this.props);
  }
}
