import API, { UserAPI } from './UserAPI';
import { User, ChangePasswordRequestData } from './interfacesAPI';
import Store from './Store';

class UserController {
  private readonly api : UserAPI;

  constructor() {
    this.api = API;
  }

  public updateProfile = (data: User) => this.api.updateProfile(data);

  public updateAvatar = (data: FormData) => this.api.updateAvatar(data).catch((error: Error) => Store.set('error', error));

  public updatePassword = (data: ChangePasswordRequestData) => this.api.updatePassword(data);
}

export default new UserController();
