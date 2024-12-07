import store, { StoreEvents, type State } from './Store';
import Block from './block';

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isEqual<T extends StringIndexed|string>(obj1: T, obj2: T): boolean {
  if (!isPlainObject(obj1) || !isPlainObject(obj2)) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];

  if (keys1.length !== keys2.length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) {
    if (!isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export function withStore<SP extends StringIndexed|State>(mapStateToProps: (state: State) => Partial<State>) {
  return function<P extends StringIndexed & SP> (Component: typeof Block<P>) {
    return class extends Component {
      public onChangeStoreCallback: () => void;

      constructor(props: P) {
        let state = mapStateToProps(store.getState());

        super({ ...(props as P), ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            (this as Block<P&SP>).setProps({ ...newState as P&SP });
          }

          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
