import './registration.scss';
import Block from '../../../services/block';
import template from './registration.hbs?raw';
import AuthController from '../../../services/AuthController';
import { RegisterData } from '../../../services/AuthAPI';
import routes from '../../../services/routes';
import router from '../../../services/Router/router';
import { withStore } from '../../../services/withStore';

type RegistrationProps = Record<string, unknown>;

export default class RegistrationPage extends Block<RegistrationProps> {
  constructor(props: RegistrationProps) {
    super({
      ...props,
      onRegister: (event : Event) => {
        event.preventDefault();
        const form: Record<string, string | null> = {};
        const keys = Object.keys(this.refs);
        keys.forEach((key) => {
          form[key] = this.refs[key].value();
        });
        console.table(form);
        AuthController.register(form as RegisterData);
      },

      onRegisterClick: () => {
        router.go(routes.LogIn);
      },
    });
    AuthController.getUser().catch(() => {
        router.go(routes.Messenger);
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ user: state.user }));

export const Registration = withUser(RegistrationPage);
