export const ROUTES = {
  about: {
    route: '/about',
    id: 'about',
  },
  blog: {
    route: '/',
    id: 'blog',
  },
  uiKit: {
    route: '/ui-kit',
    id: 'ui-kit',
  },
};

export type Routes = (typeof ROUTES)[keyof typeof ROUTES]['route'];
