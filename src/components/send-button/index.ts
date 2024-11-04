import './send-button.scss';
import Block from '../../services/block';
import template from './send-button.hbs?raw';

export default class SendButton extends Block<any> {
  constructor(props: any) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
