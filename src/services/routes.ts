const routes : Record<string, string> = {
  LogIn: '/',
  Chat: '/messenger',
  Registration: '/sign-up',
  Profile: '/profile',
  ProfileEdit: '/settings',
  PassEdit: '/pass-settings',
  Error404: '/error404',
  Error500: '/error500',
} as const;

export default routes;
