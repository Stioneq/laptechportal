export interface MenuItem {
  title: string;
  link: string;
  roles?: string[]; // by default all roles all allowed
}
