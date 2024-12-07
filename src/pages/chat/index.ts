import './chat.scss';
import Block from '../../services/block';
import template from './chat.hbs?raw';
import routes from '../../services/routes';
import router from '../../services/Router/router';


type ChatProps = Record<string, unknown>;

export default class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({
      ...props,

      onChatClick: (e: any) => {
        e.preventDefault();
        router.go(routes.Profile);
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
