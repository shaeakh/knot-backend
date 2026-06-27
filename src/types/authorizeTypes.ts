export type ModuleName =
  | 'userModule'
  | 'itemModule' // <-- tshirtModule এর বদলে এটি হবে
  | 'accessControllModule'
  | 'authModule';

export type ActionType = 'create' | 'update' | 'delete' | 'view';
