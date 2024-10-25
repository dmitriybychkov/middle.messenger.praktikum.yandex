import './search.scss';
import Block from '../../services/block';
import template from './search.hbs?raw';

interface SearchProps {
    onBlur?: () => void;
    events: {
    };
}

export default class Search extends Block<SearchProps | any> {
  constructor(props: SearchProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
