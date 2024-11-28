import Handlebars from 'handlebars';
import registerComponent from './services/registerComponent';
import Block from './services/block';
import Router from './services/Router/router';
import routes from './services/routes';

import Input from './components/input/index';
import Button from './components/button/index';
import ButtonReturn from './components/buttonReturn/index';
import Form from './components/form/index';
import FormField from './components/form-field/index';
import Link from './components/link/index';
import Avatar from './components/avatar/index';
import Typography from './components/typography/index';
import Search from './components/search/index';
import ChatItem from './components/chatItem/index';
import Message from './components/message/index';
import File from './components/file/index';
import MessageInput from './components/message-input/index';
import SendButton from './components/send-button/index';
import ErrorMessage from './components/error-message/index';

import LogIn from './pages/auth/login/index';
import { Profile } from './pages/profile/index';
import { ProfileEdit } from './pages/profileEdit/index';
import { PassEdit } from './pages/passwordEdit/index';
import Registration from './pages/auth/registration/index';
import Error404 from './pages/errors/error404/index';
import Error500 from './pages/errors/error500/index';
import Chat from './pages/chat/index';

Handlebars.registerPartial('Typography', Typography);
Handlebars.registerPartial('ChatItem', ChatItem);
Handlebars.registerPartial('Message', Message);
Handlebars.registerPartial('File', File);

registerComponent('Button', Button as typeof Block);
registerComponent('Input', Input as typeof Block);
registerComponent('Form', Form as typeof Block);
registerComponent('FormField', FormField as typeof Block);
registerComponent('Search', Search as typeof Block);
registerComponent('MessageInput', MessageInput as typeof Block);
registerComponent('SendButton', SendButton as typeof Block);
registerComponent('ErrorMessage', ErrorMessage as typeof Block);
registerComponent('Link', Link as typeof Block);
registerComponent('ButtonReturn', ButtonReturn as typeof Block);
registerComponent('Avatar', Avatar as typeof Block);

const pages : StringIndexed = {
  LogIn,
  Chat,
  Error404,
  Error500,
  Profile,
  ProfileEdit,
  PassEdit,
  Registration
};

document.addEventListener('DOMContentLoaded', () => {
  Object.keys(pages).forEach((page) => {
    Router.use(routes[page], pages[page]);
  });
  Router.start();
});
