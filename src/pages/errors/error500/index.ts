import '../error.scss';
import Block from '../../../services/block';
import template from './error500.hbs?raw';

type Error500Props = Record<string, unknown>;

export default class Error500 extends Block<Error500Props> {
  constructor(props: Error500Props) {
    super({
      ...props,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
