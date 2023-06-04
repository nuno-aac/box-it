/**
 * Module dependencies.
 */

import { HTMLProps, ReactElement, forwardRef } from 'react';
import styled from 'styled-components';


/**
 * `Props` type
 */

type Props = HTMLProps<HTMLInputElement> & {
  as?: undefined
}

/**
 * `InputWrapper` styled component.
 */

const InputWrapper = styled.div`
  background-color: #505050;
  border-radius: 4px;
  width: 100%;
`

/**
 * StyledInput styled component.
 */

const StyledInput = styled.input`
  background: none;
  border: none;
  color: white;
  margin: 0;
  padding: 10px 24px;

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
  (props: Props, ref: any): ReactElement => {

    return (
      <InputWrapper>
        <StyledInput
          {...props}
          ref={ref}
        />
      </InputWrapper>
    );
  }
);

/**
 * `InputField` display name.
 */

InputField.displayName = 'InputField';
