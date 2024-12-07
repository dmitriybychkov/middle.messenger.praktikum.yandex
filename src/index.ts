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
import { ChatBox } from './components/ChatBox/ChatBox';
import { ChatFeed } from './components/ChatFeed/ChatFeed';
import { ChatHeader } from './components/ChatHeader/ChatHeader';
import { ChatList } from './components/ChatList/ChatList';
import { ChatMessage } from './components/ChatMessage/ChatMessage';
import { ChatMessageBar } from './components/ChatMessageBar/ChatMessageBar';
import { ChatSearchBar } from './components/ChatSearchBar/ChatSearchBar';
import { ChatSettingsBar } from './components/ChatSettingsBar/ChatSettingsBar';
import { ChatSideBar } from './components/ChatSideBar/ChatSideBar';
import { ChatWindow } from './components/ChatWindow/ChatWindow';
import { DialogCreateChat } from './components/DialogCreateChat/DialogCreateChat';
import { DialogAddUser } from './components/DialogAddUser/DialogAddUser';
import { DialogRemoveUser } from './components/DialogRemoveUser/DialogRemoveUser';
import { DialogDeleteChat } from './components/DialogDeleteChat/DialogDeleteChat';
import { DialogUploadMedia } from './components/DialogUploadMedia/DialogUploadMedia';
import { ChatAvatar} from './components/ChatAvatar/ChatAvatar';
import { ChatButton } from './components/ChatButton/ChatButton';
import { ChatInput} from './components/ChatInput/ChatInput';
import { ChatFormField } from './components/ChatFormField/ChatFormField';
import { ApiErrorMessage } from './components/ApiErrorMessage/ApiErrorMessage';
import { Dialog } from './components/Dialog/Dialog';
import { FileInput } from './components/FileInput/FileInput';
import { ChatForm } from './components/ChatForm/ChatForm';

import LogIn from './pages/auth/login/index';
import { Profile } from './pages/profile/index';
import { ProfileEdit } from './pages/profileEdit/index';
import { PassEdit } from './pages/passwordEdit/index';
import Registration from './pages/auth/registration/index';
import Error404 from './pages/errors/error404/index';
import Error500 from './pages/errors/error500/index';
import { Messenger } from './pages/Messenger/Messenger';

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
registerComponent('ChatSideBar', ChatSideBar as typeof Block);
registerComponent('ChatWindow', ChatWindow as typeof Block);
registerComponent('DialogCreateChat', DialogCreateChat as typeof Block);
registerComponent('DialogAddUser', DialogAddUser as typeof Block);
registerComponent('DialogRemoveUser', DialogRemoveUser as typeof Block);
registerComponent('DialogDeleteChat', DialogDeleteChat as typeof Block);
registerComponent('DialogUploadMedia', DialogUploadMedia as typeof Block);
registerComponent('ChatBox', ChatBox as typeof Block);
registerComponent('ChatFeed', ChatFeed as typeof Block);
registerComponent('ChatHeader', ChatHeader as typeof Block);
registerComponent('ChatList', ChatList as typeof Block);
registerComponent('ChatMessage', ChatMessage as typeof Block);
registerComponent('ChatMessageBar', ChatMessageBar as typeof Block);
registerComponent('ChatSearchBar', ChatSearchBar as typeof Block);
registerComponent('ChatSettingsBar', ChatSettingsBar as typeof Block);
registerComponent('ChatButton', ChatButton as typeof Block);
registerComponent('ChatAvatar', ChatAvatar as typeof Block);
registerComponent('ChatInput', ChatInput as typeof Block);
registerComponent('ChatFormField', ChatFormField as typeof Block);
registerComponent('ApiErrorMessage', ApiErrorMessage as typeof Block);
registerComponent('Dialog', Dialog as typeof Block);
registerComponent('FileInput', FileInput as typeof Block);
registerComponent('ChatForm', ChatForm as typeof Block);

const pages : StringIndexed = {
  LogIn,
  Messenger,
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
