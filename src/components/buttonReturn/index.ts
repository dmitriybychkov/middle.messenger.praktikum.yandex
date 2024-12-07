import './buttonReturn.scss';
import Block from '../../services/block';
import template from './buttonReturn.hbs?raw';

interface ButtonReturnProps {
  type: string,
  onClick?: () => void;
}

export default class ButtonReturn extends Block<ButtonReturnProps|any> {
  constructor(props: ButtonReturnProps) {
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
