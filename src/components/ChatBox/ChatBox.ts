import Block from '../../services/block';
import template from './ChatBox.hbs?raw';
import './ChatBox.scss';
import store from '../../services/Store';
import { Chat } from '../../services/interfacesAPI';

interface ChatBoxProps extends Chat{
    [key: string]: unknown,
    chat: StringIndexed;
    isActive: boolean,
    events: { click : () => void };
}

export class ChatBox extends Block<ChatBoxProps> {
  constructor(props: ChatBoxProps) {
    super({
      ...props,
      isActive: props.id === (store.getState().currentChat as Chat)?.id,
      events: {
        click: () => {
          this.onSelect();
        },
      },
    });
  }

  protected onSelect() {
    store.set('currentChat', this.props.chat);
  }

  render() {
    return this.compile(template, this.props);
  }
}
