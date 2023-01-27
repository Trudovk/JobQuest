// not in use yet (probably never)

import { StaticHandlerContext } from "@remix-run/router";
import ReactDOMServer from "react-dom/server";
import {
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { routerRoutes } from "./routes";

const makeContext: (url: string) => StaticHandlerContext = (url: string) => ({
  basename: "",
  location: {
    pathname: url,
    search: "",
    hash: "",
    state: undefined,
    key: url,
  },
  matches: [],
  loaderData: {},
  actionData: {},
  errors: {},
  statusCode: 200,
  loaderHeaders: {},
  actionHeaders: {},
  activeDeferreds: null,
  _deepestRenderedBoundaryId: null,
});

export function SSRRender(url: string | Partial<Location>) {
  const ctx =
    typeof url === "string" ? makeContext(url) : makeContext(url.href ?? "/");
  return ReactDOMServer.renderToString(
    <StaticRouterProvider
      router={createStaticRouter(routerRoutes, ctx)}
      context={ctx}
    />
  );
}
