import './passwordEdit.scss';
import Block from '../../services/block';
import template from './passwordEdit.hbs?raw';

type PassEditProps = Record<string, unknown>;

export default class PassEdit extends Block<PassEditProps> {
  constructor(props: PassEditProps) {
    super({
      ...props,
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
