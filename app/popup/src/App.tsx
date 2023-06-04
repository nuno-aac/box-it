import './styles/styles.css'
import { AppContent } from './components/content';
import { GlobalStyle } from './styles/global';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useCurrentTab from './hooks/use-current-tab';

/**
 * `queryClient` constant.
 */

const queryClient = new QueryClient();


function App() {
  const activeTabId = useCurrentTab();
  
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />

      {activeTabId &&<AppContent activeTabId={activeTabId} />}
    </QueryClientProvider>
  );
}

export default App
