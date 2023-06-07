import { ButtonComponent } from '../../components/button/index';
import { Collapse } from '../../components/collapse';
import { CssData } from '../../types/css';
import { CssFormData, SettingsForm } from './form';
import { useAddCss } from '../../api/add-css-data';
import { useCallback, useEffect } from 'react';
import { useCssData } from '../../api/use-css-data';
import { useForm } from 'react-hook-form';
import { useRemoveCss } from '../../api/remove-css-data';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  activeTabId: number
}

/**
 * `Wrapper` styled component.
 */

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
  padding: 20px;
  width: 300px;
`;

export const AppContent = ({ activeTabId }: Props) => {
  const { data: cssData, refetch } = useCssData(activeTabId);
  const form = useForm<CssFormData>({
    defaultValues: cssData as CssData
  });

  const { handleSubmit, reset } = form;
  const generateCss = useCallback(({ color, selector }: CssData) => {
    const normalizedColor = color && color.length > 0 ? color : '#f00';
    const normalizedSelector =
      selector && selector.length > 0 ? selector : '*, *::after, *::before';

    return `
      ${normalizedSelector} {
        outline: 1px dotted ${normalizedColor} !important;
      }
    `;
  }, [])

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

  const ejectCss = useCallback(
    async (cssToRemove: string) => {
      await chrome.scripting.removeCSS({
        css: cssToRemove ?? undefined,
        target: {
          tabId: activeTabId
        }
      });
    },
    [activeTabId]
  );

  const onSubmit = useCallback(async ({ color, selector }: CssFormData) => {
    const normalizedColor = color && color.length > 0 ? color : '#f00';
    const normalizedSelector = 
      selector && selector.length > 0 ?  selector : '*, *::after, *::before';

    const newCssData = {
      color: normalizedColor,
      selector: normalizedSelector
    }

    try {
      await injectCss(generateCss(newCssData))
      addCss({
        css: {
          color,
          selector
        },
        id: activeTabId
      });
    } catch (error) {
      // eslint-disable-next-line no-alert
      window?.alert(
        'There was a problem with the extension. Maybe try reloading the page?'
      );
    }
  }, [activeTabId, addCss, generateCss, injectCss]);

  const onRemove = useCallback(async () => {
      try {
        await ejectCss(generateCss(cssData as CssData));
        removeCss(activeTabId);
      } catch (error) {
        // eslint-disable-next-line no-alert
        window?.alert(
          'There was a problem with the extension. Maybe try reloading the page?'
        );
      }
    },
    [activeTabId, cssData, ejectCss, generateCss, removeCss]
  );

  useEffect(() => {
    if(cssData) { 
      reset(cssData);
    }
  }, [cssData, reset])

  return (
    <>
      <Wrapper>
        <Collapse
          closed={!!cssData}
          header={`Settings${cssData ? ' (Unbox to edit)' : ''}`}
        >
          <SettingsForm form={form} />
        </Collapse>

        <ButtonComponent 
          onClick={!cssData ? handleSubmit(onSubmit) : onRemove}
        >
          {!cssData ? 'Box it' : 'Unbox it'}
        </ButtonComponent>
      </Wrapper>
    </>
  );
};
