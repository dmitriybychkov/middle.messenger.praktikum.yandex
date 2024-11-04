import './chat.scss';
import Block from '../../services/block';
import template from './chat.hbs?raw';

type ChatProps = Record<string, unknown>;

export default class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({
      ...props,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
