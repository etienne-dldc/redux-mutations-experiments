import Axios, { AxiosInstance } from 'axios';
import { PostList } from 'module/Model/PostList';
import { Post } from 'module/Model/Post';
import { Menu } from 'module/Model/Menu';
import { Categories } from 'module/Model/Categories';
import { PageList } from 'module/Model/PageList';
import { Page } from 'module/Model/Page';
import { nn } from 'module/Common';

export namespace MelezeApi {
  let apiClient: AxiosInstance | null = null;

  let prefetchedData: { [key: string]: any } | null = null;
  let baseUrl: string | null;

  export function configure(url: string, data: { [key: string]: any }): void {
    if (prefetchedData !== null) {
      console.warn('prefetchedData already set');
    }
    baseUrl = url;
    prefetchedData = data;
  }

  const getApiClient = (): AxiosInstance => {
    if (apiClient === null) {
      apiClient = Axios.create({
        baseURL: nn(baseUrl),
        timeout: 15000,
      });
    }
    return apiClient;
  };

  const getRoute = (route: string): Promise<any> => {
    const prefetchedRoute = `/meleze/v1${route}`;
    if (prefetchedData && prefetchedData[prefetchedRoute]) {
      console.info(`Use prefetched for ${prefetchedRoute}`);
      return Promise.resolve(prefetchedData[prefetchedRoute]);
    }
    console.info(`Fetch for ${prefetchedRoute}`);
    return getApiClient()
      .get(route)
      .then(res => {
        return res.data;
      });
  };

  export const getPost = (postId: number): Promise<Post> => {
    return getRoute(`/posts/${postId}`).then(data => {
      return Post.createFromApi(data);
    });
  };

  export const getPostList = (): Promise<PostList> => {
    return getRoute('/posts').then(data => {
      return PostList.createFromApi(data);
    });
  };

  export const getPage = (pageId: number): Promise<Page> => {
    return getRoute(`/pages/${pageId}`).then(data => {
      return Page.createFromApi(data);
    });
  };

  export const getPageList = (): Promise<PageList> => {
    return getRoute('/pages').then(data => {
      return PageList.createFromApi(data);
    });
  };

  export const getMenu = (): Promise<Menu> => {
    return getRoute('/menu').then(data => {
      return Menu.createFromApi(data);
    });
  };

  export const getCategories = (): Promise<Categories> => {
    return getRoute('/categories').then(data => {
      return Categories.createFromApi(data);
    });
  };
}
