import Block from "../block";

type StringIndexed = Record<string, any>;
export type Nullable<T> = T | null | {};

export interface BlockConstructable {
  new(props: StringIndexed): Block<StringIndexed>;
}

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block<StringIndexed>) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.element!);

  return root;
}

export default class Route {
  private block: Nullable<Block<StringIndexed>> = null;

  private _pathname: string;

  private readonly _blockClass: BlockConstructable;

  private readonly _root: string;

  constructor(pathname: string, view: BlockConstructable, rootQuery: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._root = rootQuery;
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this._blockClass({});
    }
    render(this._root, this.block! as Block<StringIndexed>);
  }
}
