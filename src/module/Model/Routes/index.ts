export enum RouteType {
  Home = 'home',
  Post = 'post',
  Category = 'category',
  Page = 'page',
}

export type Route = {
  type: RouteType;
  link: string;
  id: number | null;
  path: string;
};

export type Routes = { [key: string]: Route };
