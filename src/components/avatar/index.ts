import './avatar.scss';
import Block from '../../services/block';
import template from './avatar.hbs?raw';

interface AvatarProps extends StringIndexed {
  isOwn: boolean,
  onClick: (event: Event) => void,
  events?: {
    click?: (event: Event) => void,
  }
}

export default class Avatar extends Block<AvatarProps> {
constructor(props: AvatarProps) {
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
