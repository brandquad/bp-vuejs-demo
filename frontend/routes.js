const Home = () => import(/* webpackChunkName: "bp-c-home" */ './pages/Home');
const Dropdown = () => import(/* webpackChunkName: "bp-c-dropdown" */ './pages/Dropdown');

export default [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'dropdown',
    path: '/dropdown',
    component: Dropdown
  },
  {
    name: 'other',
    path: '*',
    component: Home
  }
];
