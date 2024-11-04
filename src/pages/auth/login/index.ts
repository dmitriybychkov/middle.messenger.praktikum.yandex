import './login.scss';
import Block from '../../../services/block';
import template from './login.hbs?raw';

type LogInProps = Record<string, unknown>;

export default class LogIn extends Block<LogInProps> {
  constructor(props: LogInProps) {
    super({
      ...props,

      onLogin: (event : Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();

        console.table({
          login,
          password,
        });
      },

    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
