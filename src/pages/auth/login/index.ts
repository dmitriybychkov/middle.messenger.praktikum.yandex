import './login.scss';
import Block from '../../../services/block';
import template from './login.hbs?raw';
import routes from '../../../services/routes';
import router from '../../../services/Router/router';
import AuthController from '../../../services/AuthController';

type LogInProps = Record<string, unknown>;

export default class LogIn extends Block<LogInProps> {
  constructor(props: LogInProps) {
    super({
      ...props,

      onLogin: (event : Event) => {
        event.preventDefault();
        const login = this.refs.login.value()!;
        const password = this.refs.password.value()!;

        AuthController.login({
          login,
          password,
        });
      },

      onLoginClick: () => {
        router.go(routes.Registration);
      },

    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
