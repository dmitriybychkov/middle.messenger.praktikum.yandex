import { EventBus } from './eventBus';
import { Chat, Message, User } from './interfacesAPI';

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export enum StoreEvents {
  Updated = 'updated'
}

export interface State extends StringIndexed {
  user: Nullable<User>,
  currentChat: Nullable<Chat>,
  messages?: Record<number, Nullable<Message[]>>,
  error: Nullable<string>,
  isOpen: Nullable<boolean>,
  isOpenDialogChat: Nullable<boolean>,
  isOpenDialogDelete: Nullable<boolean>,
  isOpenDialogPassword: Nullable<boolean>,
  isOpenDialogUpload: Nullable<boolean>,
  isOpenDialogAddUser: Nullable<boolean>,
  isOpenDialogRemoveUser: Nullable<boolean>,
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (!isPlainObject(object)) {
    return object;
  }
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result: Indexed = object as Indexed;

  const segments = path.split('.');
  const lastKey = segments.pop();

  let nestedObj: Indexed = result;

  segments.forEach((key) => {
    if (!isPlainObject(nestedObj[key])) {
      (nestedObj as Indexed)[key] = {};
    }
    nestedObj = (nestedObj as Indexed)[key] as Indexed;
  });

  if (lastKey) {
    (nestedObj as Indexed)[lastKey] = value;
  }

  return result;
}

export class Store extends EventBus {
  private state: Nullable<State> = {};

  constructor() {
    super();
    this.on(StoreEvents.Updated, () => null);
  }

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    console.warn('Store:', this, `.set('${keypath}'):`, data);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState(): State {
    return this.state as State;
  }

  public nullifyError() {
    this.set('error', null);
  }

  public resetFile() {
    this.set('file', null);
  }

  public resetChat() {
    this.set('currentChat', null);
  }
}

export default new Store();
