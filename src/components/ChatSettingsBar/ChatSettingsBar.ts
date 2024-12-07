import Block from '../../services/block';
import template from './ChatSettingsBar.hbs?raw';
import './ChatSettingsBar.scss';
import router from '../../services/Router/router';
import store from '../../services/Store';
import routes from '../../services/routes';

interface ChatSettingsBarProps {
  onSwitchToSettings : () => void;
  onCreateChat: () => void;
}

export class ChatSettingsBar extends Block<ChatSettingsBarProps | any> {
  constructor(props: ChatSettingsBarProps) {
    super({
      ...props,
      onSwitchToSettings: () => {
        router.go(routes.Profile);
      },
      // Был вариант пропсами тянуть в компонент SideBar, затем в Messenger,
      // Но логичнее в одном месте чтобы было всё, поэтому решил через Store передавать состояние.
      onCreateChat: () => {
        store.nullifyError();
        store.set('isOpenDialogChat', true);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
