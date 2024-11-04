import Handlebars from 'handlebars';
import registerComponent from './services/registerComponent';
import Block from './services/block';
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
import Profile from './pages/profile/index';
import ProfileEdit from './pages/profileEdit/index';
import PassEdit from './pages/passwordEdit/index';
import Registration from './pages/auth/registration/index';
import Error404 from './pages/errors/error404/index';
import Error500 from './pages/errors/error500/index';
import Chat from './pages/chat/index';

Handlebars.registerPartial('Typography', Typography);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('ButtonReturn', ButtonReturn);
Handlebars.registerPartial('Avatar', Avatar);
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

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')!;
  const getPage = () => {
    switch (window.location.pathname) {
      case '/login': return new LogIn({});
      case '/profile': return new Profile({});
      case '/profile-edit': return new ProfileEdit({});
      case '/password-edit': return new PassEdit({});
      case '/registration': return new Registration({});
      case '/error500': return new Error500({});
      case '/chat': return new Chat({});
      default: return new Error404({});
    }
  };

  const page: Block<{}> = getPage();
  root.append(page.element as HTMLElement);
  page.dispatchComponentDidMount();
});
