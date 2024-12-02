import './passwordEdit.scss';
import Block from '../../services/block';
import template from './passwordEdit.hbs?raw';
import router from '../../services/Router/router';
import routes from '../../services/routes';
import { withStore } from '../../services/withStore';
import UserController from '../../services/UserController';
import { User } from '../../services/interfacesAPI';
import store from '../../services/Store';

interface PassEditProps extends User {
  onReturnClick : (e: Event) => void,
  onSaveChanges : (event : Event) => void,
}
export default class PassEditPage extends Block<PassEditProps> {
  constructor(props: PassEditProps) {
    super({
      ...props,
      onSaveChanges: (event : Event) => {
        event.preventDefault();
        const oldPassword = this.refs.newPassword.value() as string;
        const newPassword = this.refs.newPasswordConfirm.value() as string;

        const passwords = {
          oldPassword,
          newPassword
        } as const;
        UserController.updatePassword(passwords)
          .catch((error) => store.set('error', error))
          .finally(() => {
            if (!store.getState().error) {
              store.set('isOpenDialogPassword', false);
            }
          });
      },

      onChange: () => this.compareEntries(),
      
      onReturnClick: (e) => {
        e.preventDefault();
        router.go(routes.Profile);
      },
    });
  }


  public compareEntries() {
    const newPassword = this.refs.newPassword.value();
    const newPasswordConfirm = this.refs.newPasswordConfirm.value();

    if (newPassword && newPasswordConfirm && newPassword !== newPasswordConfirm) {
      this.refs.errorMessage.setProps({
        ...this.props,
        error: 'Пароли не совпадают',
      });
    } else {
      this.refs.errorMessage.setProps({
        ...this.props,
        error: null,
      });
    }
  }
  
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ user: state.user }));

export const PassEdit = withUser(PassEditPage);
