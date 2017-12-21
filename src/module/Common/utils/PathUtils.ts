export namespace PathUtils {
  export type Lang = 'en' | 'fr';

  export const defaultLang: Lang = 'fr';

  export function normalizePath(path: string): string {
    return '/' + path.replace(/^\/|\/$/g, '');
  }

  export function removeLangOnPath(path: string): string {
    const normPath = normalizePath(path);
    const parts = normPath.split('/');
    if (parts.length >= 1 && (parts[1] === 'fr' || parts[1] === 'en')) {
      return normalizePath(parts.slice(2).join('/'));
    }
    return normPath;
  }

  export function getLangOnPath(path: string): Lang {
    const normPath = normalizePath(path);
    const parts = normPath.split('/');
    if (parts.length >= 1 && (parts[1] === 'fr' || parts[1] === 'en')) {
      return parts[1] as any;
    }
    return defaultLang;
  }

  export function pathHasLang(path: string): boolean {
    const normPath = normalizePath(path);
    const parts = normPath.split('/');
    if (parts.length >= 1 && (parts[1] === 'fr' || parts[1] === 'en')) {
      return true;
    }
    return false;
  }

  export function addLangToPath(path: string, lang: Lang): string {
    return `/${lang}${normalizePath(path)}`;
  }
}
