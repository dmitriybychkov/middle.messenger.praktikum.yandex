import template from './DialogCreateChat.hbs?raw';
import Block from '../../services/block';
import store, { State } from '../../services/Store';
import { withStore } from '../../services/withStore';
import chatsController from '../../services/ChatsController';

interface DialogCreateChatProps {
  isOpen: boolean,
  error: Nullable<string>,
  onSubmit: (event: Event) => void,
  onClose: (event: Event) => void,
}

export class DialogCreateChatBase extends Block<DialogCreateChatProps> {
  constructor(props: DialogCreateChatProps) {
    super({
      ...props,
      onClose: (event) => {
        event.preventDefault();
        this.closeDialog();
      },
    });
  }

  public closeDialog() {
    store.nullifyError();
    store.set('isOpenDialogChat', false);
  }

  public getChatTitle() {
    console.log('asdasd', this.refs.chatTitle.value)
    return this.refs.chatTitle.value();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const DialogCreateChat = withStore((state) => ({ isOpen: (state as State).isOpenDialogChat }))(DialogCreateChatBase);
