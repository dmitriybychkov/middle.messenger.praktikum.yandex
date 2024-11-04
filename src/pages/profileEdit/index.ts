import './profileEdit.scss';
import Block from '../../services/block';
import template from './profileEdit.hbs?raw';

type ProfileEditProps = Record<string, unknown>;

export default class ProfileEdit extends Block<ProfileEditProps> {
  constructor(props: ProfileEditProps) {
    super({
      ...props,
      avatar: 'photo.svg',
      onSaveChanges: (event : Event) => {
        event.preventDefault();
        const form: Record<string, string | null> = {};
        const keys = Object.keys(this.refs);
        keys.forEach((key) => {
          form[key] = this.refs[key].value();
        });
        console.table(form);
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
