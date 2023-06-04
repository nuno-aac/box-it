import { ButtonComponent } from '../../components/button/index';
import { Collapse } from '../../components/collapse';
import { InputField } from '../../components/input';
import { useAddCss } from '../../state/add-css';
import { useCallback } from 'react';
import { useCssData } from '../../state/use-css-data';
import { useRemoveCss } from '../../state/remove-css';
import styled from 'styled-components';

/**
 * `queryClient` constant.
 */

type Props = {
  activeTabId: number
}

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  padding: 100px;
`;

export const AppContent = ({ activeTabId }: Props) => {
  const { data: css, refetch } = useCssData(activeTabId);
  const { mutate: addCss } = useAddCss({
    onSuccess: () => refetch()
  });

  const { mutate: removeCss } = useRemoveCss({
    onSuccess: () => refetch()
  });


  const injectCss = useCallback(async (newCss: string) => {
    await chrome.scripting.insertCSS({
      css: newCss ?? undefined,
      target: {
        tabId: activeTabId
      }
    });
  }, [activeTabId]);

  const ejectCss = useCallback(async () => {
    await chrome.scripting.removeCSS({
      css: css ?? undefined,
      target: {
        tabId: activeTabId
      }
    });
  }, [activeTabId, css]);

  const toggleDebug = useCallback(async () => {
    const newCss = `
      *,
      *::after,
      *::before {
        outline: 1px dotted purple;
      }
    `;

    try {
      const storage = await chrome.storage.local.get();
      const storageCss = storage?.[`${activeTabId}Css`];

      if (storageCss) {
        ejectCss()
        removeCss(activeTabId);

        return;
      }

      injectCss(newCss)
      addCss({
        css: newCss,
        id: activeTabId
      });
    } catch (error) {
      ejectCss();
      removeCss(activeTabId);
      // eslint-disable-next-line no-alert
      window?.alert(
        'There was a problem with the extension. Maybe try reloading the page?'
      );
    }
  }, [activeTabId, addCss, ejectCss, injectCss, removeCss]);

  return (
    <div>
      <Wrapper>
        <Collapse header={'Settings'}>
          <h1>{'Adasse'}</h1>

          <InputField placeholder={'*'} />
        </Collapse>

        <ButtonComponent onClick={toggleDebug}>
          {`${css ? 'Unb' : 'B'}ox it`}
        </ButtonComponent>
      </Wrapper>

      <div>{`${css}/${activeTabId}`}</div>
    </div>
  );
};
