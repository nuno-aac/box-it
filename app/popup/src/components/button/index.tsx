/**
 * Module dependencies.
 */

import { ButtonHTMLAttributes, ReactElement, ReactNode, forwardRef } from 'react';
import styled from 'styled-components';


/**
 * `Props` type
 */

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
}

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
 * `StyledButton` styled component.
 */

const StyledButton = styled.button`
  -webkit-tap-highlight-color: transparent;
  background-color: rgb(175, 139, 97);
  border: none;
  border-radius: 4px;
  box-shadow: none;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  font-family: 'Satisfy', cursive;
  font-size: 24px;
  font-weight: 700;
  padding: 0 24px;
  outline: none;
  overflow: visible;
  position: relative;
  transition: 0.5s linear;
  transition-property: box-shadow;
  white-space: nowrap;
  width: 100%;

  :hover {
    box-shadow: rgba(20, 20, 20, 1) 5px 6px 25px -11px;

    & ${ButtonBorderWrapper} {
      max-height: calc(100% + 8px);

      & ${ButtonBorder} {
        max-height: 100%;
      }
    }
  }
`;

/**
 * Export `ButtonComponent` component.
 */

export const ButtonComponent = forwardRef(
  ({ children, ...props }: Props, ref: any): ReactElement => {
    return (
      <StyledButton
        {...props}
        ref={ref}
      >
        {children}

        <ButtonBorderWrapper>
          <ButtonBorder />
        </ButtonBorderWrapper>
      </StyledButton>
    );
  }
)

/**
 * `ButtonComponent` display name.
 */

ButtonComponent.displayName = 'ButtonComponent';
