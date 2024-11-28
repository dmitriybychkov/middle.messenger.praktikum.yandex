import './link.scss';
import Block from '../../services/block';
import template from './link.hbs?raw';

interface LinkProps {
  type: string,
  onClick?: () => void;
}

export default class Link extends Block<LinkProps|any> {
constructor(props: LinkProps) {
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
