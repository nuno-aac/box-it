/**
 * Module dependencies.
 */

import { HTMLProps, ReactElement, ReactNode, forwardRef } from 'react';
import styled from 'styled-components';


/**
 * `Props` type
 */

type Props = HTMLProps<HTMLInputElement> & {
  as?: undefined;
  icon?: ReactNode;
}

/**
 * `InputWrapper` styled component.
 */

const InputWrapper = styled.div`
  background-color: #505050;
  border-radius: 4px;
  padding: 10px 16px;
`;

/**
 * `ContentWrapper` styled component.
 */

const ContentWrapper = styled.div`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 1fr auto;
`;

/**
 * StyledInput styled component.
 */

const StyledInput = styled.input`
  background: none;
  border: none;
  color: white;
  margin: 0;
  padding: 0;
  width: 100%;

  &::-ms-input-placeholder,
  &:-ms-input-placeholder,
  &::placeholder {
    color: rgb(0, 0, 0, 0.5);
  }

  :focus {
    outline: none;
  }

  ::-ms-reveal {
    display: none;
  }
`

/**
 * Export `InputField` component.
 */

export const InputField = forwardRef(
  ({ icon, ...props }: Props, ref: any): ReactElement => {

    return (
      <InputWrapper>
        <ContentWrapper>
          <StyledInput
            {...props}
            ref={ref}
          />

          {icon}
        </ContentWrapper>
      </InputWrapper>
    );
  }
);

/**
 * `InputField` display name.
 */

InputField.displayName = 'InputField';
