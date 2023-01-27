const PagePathsWithComponents: Record<
  string,
  { default: () => JSX.Element; loader?: () => Promise<any> }
> = import.meta.glob("./pages/*.tsx", { eager: true });

const routes = Object.keys(PagePathsWithComponents).map((path: string) => {
  const name = path.match(/\.\/pages\/(.*)\.tsx$/)![1];
  return {
    name,
    path: name.toLowerCase() === "index" ? "/" : `/${name.toLowerCase()}`,
    component: PagePathsWithComponents[path].default,
    loader: PagePathsWithComponents[path].loader,
  };
});

export const routerRoutes = routes.map(
  ({ path, component: RouteComp, loader }) => ({
    path,
    element: <RouteComp />,
    loader,
  })
);
