import '../error.scss';
import Block from '../../../services/block';
import template from './error404.hbs?raw';
import routes from '../../../services/routes';
import router from '../../../services/Router/router';

type Error404Props = Record<string, unknown>;

export default class Error404 extends Block<Error404Props> {
  constructor(props: Error404Props) {
    super({
      ...props,
      
      onErrorClick: () => {
        router.go(routes.Chat);
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
