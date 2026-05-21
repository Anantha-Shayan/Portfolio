// Tell TypeScript that importing CSS files is okay
declare module "*.css";
declare module "*.scss";
declare module "*.sass";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export {};