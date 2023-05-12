import './styles/styles.css'
import { ButtonComponent } from './components/button/index';
import { GlobalStyle } from './styles/global';
import { InputField } from './components/input';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  padding: 100px;
`

function App() {
  const cssToStorage = useCallback(async (tabId: number, css?: string) => {
    if(css) {
      console.log('stored', css)
      await chrome.storage.local.set({ 
        [`${tabId}Css`]: css 
      });

      return;
    }
    
    console.log('unstored', `${tabId}Css`)
    await chrome.storage.local.remove(`${tabId}Css`)
  }, [])

  const cssToInject = useCallback( async (tabId: number, css: string, isAdding: boolean) => {
    if(isAdding) {
      console.log('injected', css)
      await chrome.scripting.insertCSS({
        css,
        target: {
          tabId
        }
      });

      return;
    }

    
    console.log('removed', css, `${tabId}Css`)
    await chrome.scripting.removeCSS({
        css,
        target: {
          tabId
        }
      });
  }, [])

  const toggleDebug = useCallback(async () => {
    const [{ id }] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    const css = `
      *,
      *::after,
      *::before {
        outline: 1px dotted purple;
      }
    `;

    try {
      const storage = await chrome.storage.local.get();
      const storageCss = storage?.[`${id}Css`];

      if(storageCss){
        cssToStorage(id as number);
        cssToInject(id as number, storageCss as string, false);

        return;
      }

      cssToStorage(id as number, css)
      cssToInject(id as number, css, true)
    } catch (error) {
      cssToInject(id as number, css, false)
      cssToStorage(id as number)
      // eslint-disable-next-line no-alert
      window?.alert('There was a problem with the extension. Maybe try reloading the page?');
    }
        
  }, [cssToInject, cssToStorage])
  
  return (
    <div>
      <GlobalStyle />

      <Wrapper>
        <h1>{'Adasse'}</h1>

        <InputField placeholder={'*'} />

        <ButtonComponent onClick={toggleDebug}>
          {'Box it'}
        </ButtonComponent>
      </Wrapper>
    </div>
  );
}

export default App
