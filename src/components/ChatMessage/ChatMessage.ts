import Block from '../../services/block';
import template from './ChatMessage.hbs?raw';
import './ChatMessage.scss';
import store from '../../services/Store';
import { User } from '../../services/AuthAPI';

interface ChatMessageProps extends StringIndexed {
    isOwn: boolean,
}

export class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    super({
      ...props,
      isOwn: props.author === (store.getState().user as User).id,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
