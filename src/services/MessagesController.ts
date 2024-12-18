import { Message, User } from './interfacesAPI';
import WSTransport, { WSEvents } from './WSTransport';
import store from './Store';
//import { BASE_URL_WS } from '../core/constants/baseURL';
import { transformMessagesFromApi } from './transformers';

export const BASE_URL_WS = 'wss://ya-praktikum.tech/ws';

class MessagesController {
  private sockets : Map<Number, WSTransport> = new Map();

  private baseURL : string;

  constructor(baseURL : string) {
    this.baseURL = baseURL;
  }

  private subscribe(transport: WSTransport, chatId: number) {
    transport.on(WSEvents.Message, (message) => this.onMessage(chatId, message));
    transport.on(WSEvents.Close, () => this.onClose(chatId));
  }

  public async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = (store.getState().user as User)?.id;
    const wsTransport = new WSTransport(`${this.baseURL}${userId}/${chatId}/${token}`);
    this.sockets.set(chatId, wsTransport);

    await wsTransport.connect();
    this.subscribe(wsTransport, chatId);
    this.getMessages(chatId);
  }

  public postMessage(chatId: number, message: string) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`Chat with id:${chatId} is not connected.`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  public getMessages(chatId: number) {
    const socket = this.sockets.get(chatId);
    if (!socket) {
      throw new Error(`Chat with id:${chatId} is not connected.`);
    }

    socket.send({
      type: 'get old',
      content: null,
    });
  }

  public closeChats() {
    const chats = Array.from(this.sockets.values());
    chats.forEach((socket) => socket.close());
  }

  private onClose(chatId: number) {
    this.sockets.delete(chatId);
  }

  private onMessage(chatId: number, messages: Message | Message[]) {
    let messagesToAdd: Message[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = ((transformMessagesFromApi(messages) as Message[]).reverse());
    } else {
      messagesToAdd.push(transformMessagesFromApi(messages) as Message);
    }

    const currentMessages = (store.getState().messages || {})[chatId] || [];
    messagesToAdd = [...currentMessages as Message[], ...messagesToAdd];
    store.set(`messages.${chatId}`, messagesToAdd);
  }
}

export default new MessagesController(`${BASE_URL_WS}/chats/`);
