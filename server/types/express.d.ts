export {};

declare global {
  namespace Express {
    interface Response {
      renderBundle: (url: string) => void;
    }
  }
}
