import Block from '../../services/block';
import template from './ChatAvatar.hbs?raw';
import './ChatAvatar.scss';

interface ChatAvatarProps extends StringIndexed {
    isOwn: boolean,
    onClick: (event: Event) => void,
    events?: {
      click?: (event: Event) => void,
    }
}

export class ChatAvatar extends Block<ChatAvatarProps> {
  constructor(props: ChatAvatarProps) {
    super({
      ...props,
      events: {
        click: props?.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
