import { GlobalStyle } from './styles/global';
import { useCallback, useState } from 'react';
import styled from 'styled-components';


/**
 * `Title` styled component.
 */

const Title = styled.h1`
  font-size: 24px;
  padding: 0 24px;
`

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  padding: 100px;
`

/**
 * `ButtonBorderWrapper` styled component.
 */

const ButtonBorderWrapper = styled.div`
  position: absolute;
  max-height: 0;
  overflow: hidden;
  inset: -4px;
  transition: max-height 0.5s;
`;

/**
 * `ButtonBorder` styled component.
 */

const ButtonBorder = styled.div`
  position: absolute;
  border: 1px dashed rgb(175, 139, 97);
  inset: 0;
  height: 150%;
  max-height: 150%;
  transition: max-height 0.5s;
`;

/**
 * `Button` styled component.
 */

const Button = styled.button`
  -webkit-tap-highlight-color: transparent;
  background-color: rgb(175, 139, 97);
  border: none;
  border-radius: 4px;
  box-shadow: none;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  outline: none;
  overflow: visible;
  position: relative;
  transition: 0.5s linear;
  transition-property: box-shadow;
  white-space: nowrap;

  :hover,
  :focus {
    box-shadow: rgba(20, 20, 20, 1) 5px 6px 25px -11px;

    & ${ButtonBorderWrapper} {
      max-height: calc(100% + 8px);

      & ${ButtonBorder} {
        max-height: 100%;
      }
    }
  }
`;

function App() {
  const [isStyleInjected, setIsStyleInjected] = useState(false);
  const toggleDebug = useCallback(async () => {
    const [{ id }] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    const method = !isStyleInjected ? chrome.scripting.insertCSS : chrome.scripting.removeCSS;

    try {
      await method({
        files: ['debug.css'],
        target: {
          tabId: id as number
        }
      })
      
      setIsStyleInjected(prevState => !prevState)
    } catch (error) {
      // eslint-disable-next-line no-alert
      window?.alert('There was a problem with the extension. Maybe try reloading the page?')
    }
        
  }, [isStyleInjected])
  
  return (
    <div>
      <GlobalStyle />

      <Wrapper>
        <Button onClick={toggleDebug}>
          <Title>{'Box it'}</Title>

          <ButtonBorderWrapper>
            <ButtonBorder />
          </ButtonBorderWrapper>
        </Button>
      </Wrapper>
    </div>
  );
}

export default App
