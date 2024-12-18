import './ChatWindow.scss';
import Block from '../../services/block';
import template from './ChatWindow.hbs?raw';
import { withStore } from '../../services/withStore';
import MessagesController from '../../services/MessagesController';
import { Chat, User } from '../../services/interfacesAPI';

interface ChatWindowProps extends StringIndexed {
  id: number,
  currentChat: Chat;
  title: string,
  value: string,
  error: Nullable<string>,
  placeholder: string,
  onSend: (event: Event) => void;
}

export class ChatWindowBase extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super({
      ...props,
      onSend: (event: Event) => {
        event.preventDefault();
        const chatId = props.currentChat.id;
        const message = this.refs.messageBar.value()!;
        MessagesController.postMessage(chatId, message);
        this.refs.messageBar.setProps({
          ...props,
          value: '',
          error: null,
          placeholder: 'Введите сообщение...',
        });
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withСurrentChatMessages = withStore((state) => {
  const currentChatId = (state.currentChat as Chat)?.id || null;

  if (!currentChatId) {
    return {
      messages: [],
      currentChat: null,
      userId: (state.user as User)?.id || null,
    };
  }

  return {
    messages: (state.messages || {})[currentChatId] || [],
    currentChat: state.currentChat,
    userId: (state.user as User)?.id || null,
  };
});

export const ChatWindow = withСurrentChatMessages(ChatWindowBase);
