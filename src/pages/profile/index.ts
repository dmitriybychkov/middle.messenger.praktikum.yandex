import './profile.scss';
import Block from '../../services/block';
import template from './profile.hbs?raw';

type ProfileProps = Record<string, unknown>;

export default class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
      ...props,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
