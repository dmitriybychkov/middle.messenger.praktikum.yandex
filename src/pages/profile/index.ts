import './profile.scss';
import Block from '../../services/block';
import template from './profile.hbs?raw';
import routes from '../../services/routes';
import router from '../../services/Router/router';
import AuthController from '../../services/AuthController';
import { withStore } from '../../services/withStore';
import { User } from '../../services/interfacesAPI';
import store from '../../services/Store';
import UserController from '../../services/UserController';

interface ProfileProps extends User {
  isEditable: boolean,
  onProfileEditClick : (event: Event) => void,
  onPassEditClick : (event : Event) => void,
  onReturnClick : (event : Event) => void,
  onLogoutClick: (event : Event) => void,
  onChangeAvatar : (event: Event) => void,
  onUploadAvatar : (event: Event) => void,
}
export class ProfilePage extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
      ...props,
      onProfileEditClick: (e: any) => {
        e.preventDefault();
        router.go(routes.ProfileEdit);
      },
    
      onPassEditClick: (e: any) => {
        e.preventDefault();
        router.go(routes.PassEdit);
      },
    
      onReturnClick: (e: any) => {
        e.preventDefault();
        router.go(routes.Messenger);
      },

      onLogoutClick: (e: any) => {
        e.preventDefault();
        AuthController.logout();
      },
      onChangeAvatar: (event: Event) => {
        event.preventDefault();
        store.set('isOpenDialogUpload', true);
      },
      onUploadAvatar: (event: Event) => {
        event.preventDefault();
        const { file } = store.getState();
        const data = new FormData();
        data.append('avatar', file);
        UserController.updateAvatar(data)
          .catch((error) => store.set('error', error))
          .finally(() => {
            if (!store.getState().error) {
              store.set('isOpenDialogUpload', false);
              AuthController.getUser();
            }
          });
      },
    });
    AuthController.getUser()
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ user: state.user }));

export const Profile = withUser(ProfilePage);
