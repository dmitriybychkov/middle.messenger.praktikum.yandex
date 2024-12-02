import Block from '../../services/block';
import template from './ChatButton.hbs?raw';
import './ChatButton.scss';

interface ChatButtonProps {
    label: string;
    type: string,
    style?: string,
    className?: string,
    onClick?: () => void;
  }

export class ChatButton extends Block<ChatButtonProps|any> {
  constructor(props: ChatButtonProps) {
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
