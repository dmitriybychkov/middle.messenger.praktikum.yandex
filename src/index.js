import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
    login: [Pages.Login],
    registration: [Pages.Registration],
    error404: [Pages.Error404],
    error500: [Pages.Error500],
    profile: [Pages.Profile],
    profileEdit: [Pages.ProfileEdit],
    passwordEdit: [Pages.PasswordEdit],
    chatList: [Pages.ChatList]
};

for (let key in Components) {
    Handlebars.registerPartial(key, Components[key]);
}

const nav = (page) => {
    const [src, assets] = pages[page];
    const handlebars = Handlebars.compile(src);
    document.getElementById('app').innerHTML = handlebars(assets);
};

document.addEventListener('DOMContentLoaded', (event) => {
    const path = event.target.location.pathname;

    const paths = {
        '/': () => nav('login'),
        '/login': () => nav('login'),
        '/registration': () => nav('registration'),
        '/page-not-found': () => nav('error404'),
        '/unexpected-error': () => nav('error500'),
        '/profile': () => nav('profile'),
        '/profile-edit': () => nav('profileEdit'),
        '/password-edit': () => nav('passwordEdit'),
        '/chat-list': () => nav ('chatList')
    }

    if (paths[path]) {
        return paths[path]()
    }
    nav('error404');
});