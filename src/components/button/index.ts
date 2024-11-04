import './button.scss';
import Block from '../../services/block';
import template from './button.hbs?raw';

interface ButtonProps {
    type: string,
    onClick?: () => void;
  }

export default class Button extends Block<ButtonProps|any> {
  constructor(props: ButtonProps) {
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
