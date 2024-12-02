import Block from '../../services/block';
import template from './ChatList.hbs?raw';
import './ChatList.scss';

interface ChatListProps extends StringIndexed {}

export class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
