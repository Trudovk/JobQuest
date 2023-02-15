import { LoaderFunctionArgs } from "react-router-dom";

const PagePathsWithComponents: Record<
  string,
  {
    default: () => JSX.Element;
    loader?: (a: LoaderFunctionArgs) => Promise<any>;
  }
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

let loadingCallback: (s: boolean) => void = () => {};

export const attachLoadingCallback = (callback: typeof loadingCallback) => {
  loadingCallback = callback;
};

const loadingWrapper = async (ldr: () => Promise<any>) => {
  loadingCallback(true);
  const result = await ldr();
  loadingCallback(false);
  return result;
};

export const routerRoutes = routes.map(
  ({ path, component: RouteComp, loader }) => ({
    path,
    element: <RouteComp />,
    loader: loader
      ? (a: LoaderFunctionArgs) => loadingWrapper(() => loader(a))
      : undefined,
  })
);
