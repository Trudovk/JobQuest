/// <reference types="vite/client" />

type InferLoaderType<L extends (args: LoaderFunctionArgs) => Promise<unknown>> =
  Awaited<ReturnType<L>>;
