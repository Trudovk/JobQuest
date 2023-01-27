/// <reference types="vite/client" />

type InferLoaderType<L extends () => Promise<unknown>> = Awaited<ReturnType<L>>;
