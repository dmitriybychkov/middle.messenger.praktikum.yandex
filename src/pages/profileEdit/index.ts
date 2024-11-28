import './profileEdit.scss';
import Block from '../../services/block';
import template from './profileEdit.hbs?raw';
import router from '../../services/Router/router';
import routes from '../../services/routes';
import { withStore } from '../../services/withStore';
import UserController from '../../services/UserController';
import AuthController from '../../services/AuthController';
import { User } from '../../services/interfacesAPI';

interface ProfileEditProps extends User {
  onReturnClick : (e: Event) => void,
  onSaveChanges : (event : Event) => void,
}
class ProfileEditPage extends Block<ProfileEditProps> {
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
        UserController.updateProfile(form as User)
          .then(() => AuthController.getUser())
          .finally(() => this.setProps({
            ...props,
          }));
      },

      onReturnClick: (e) => {
        e.preventDefault();
        router.go(routes.Profile);
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ user: state.user }));

export const ProfileEdit = withUser(ProfileEditPage);
