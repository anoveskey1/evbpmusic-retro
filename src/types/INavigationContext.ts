interface INavigationContext {
  goBack: () => string | null;
  goForward: () => string | null;
  history: string[];
  updateHistory: (newPath: string) => void;
}

export default INavigationContext;
