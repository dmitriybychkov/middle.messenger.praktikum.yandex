import store from './Store';
import API, { AuthAPI, LoginData, RegisterData } from './AuthAPI';
import router from './Router/router';
import routes from './routes';
import { transformUserFromApi } from './transformers';
import { User } from './interfacesAPI';

const redirectErrors = {
  ALREADY_IN_SYSTEM: 'Error: Request failed with status 400, User already in system',
  BAD_USER_COOKIE: 'Error: Request failed with status 401, Cookie is not valid',
} as const;

class AuthController {
  private readonly api : AuthAPI;

  constructor() {
    this.api = API;
  }

  public async login(data : LoginData) {
    store.nullifyError();
    try {
      await this.api.login(data);
      await this.getUser();
      router.go(routes.Profile);
    } catch (error) {
      console.error(error);
      if (String(error) === redirectErrors.ALREADY_IN_SYSTEM) {
        router.go(routes.Messenger);
      } else {
        store.set('error', error);
      }
    }
  }

  public async register(data : RegisterData) {
    store.nullifyError();
    try {
      await this.api.register(data);
      await this.getUser();
      router.go(routes.Profile);
    } catch (error) {
      console.error(error);
      store.nullifyError();
      store.set('error', error);
    }
  }

  public async getUser() {
    store.nullifyError();
    try {
      const user = await this.api.read();
      store.set('user', transformUserFromApi(user as unknown as User));
    } catch (error) {
      console.error(error);
      store.set('error', error);
    }
  }

  public async logout() {
    store.nullifyError();
    try {
      await this.api.logout();
      store.set('user', {});
      router.go(routes.LoginPage);
    } catch (error) {
      if (String(error) === redirectErrors.BAD_USER_COOKIE) {
        router.go(routes.LogIn);
      } else {
        store.set('error', error);
      }
    }
  }
}

export default new AuthController();
