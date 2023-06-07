/**
 * Module dependencies.
 */

import { InputField } from '../input';
import { ReactElement, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { prop } from 'styled-tools';
import styled from 'styled-components';

/**
 * `Props` type.
 */

type Props = {
  form: UseFormReturn<CssFormData>
}

/**
 * Export `CssFormData` type.
 */

export type CssFormData = {
  color: string;
  selector: string;
}

/**
 * FormWrapper styled component.
 */

const FormWrapper = styled.form`
  display: grid;
  grid-column-gap: 8px;
  grid-row-gap: 12px;
  grid-template-columns: auto 1fr;
  padding-top: 8px;
`;

/**
 * `Label` component
 */

const Label = styled.div`
  align-self: center;
`;

/**
 * `ColorSquare` component
 */

const ColorSquare = styled.div<{ color: string }>`
  align-self: center;
  border: 1px solid white;
  border-radius: 4px;
  background-color: ${prop('color')};
  height: 12px;
  width: 12px;
`;

/**
 * Export `SettingsForm` component.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SettingsForm = ({ form }: Props): ReactElement => {
  const { register, watch } = form;
  const watchColor = watch('color');
  const color = useMemo(() => {
    if (!watchColor || watchColor.length === 0) {
      return '#f00'
    }

    return watchColor;
  }, [watchColor])

  return (
    <FormWrapper>
      <Label>{'Border:'}</Label>

      <InputField
        icon={<ColorSquare color={color} />}
        placeholder={'Default: #f00'}
        {...register('color')}
      />

      <Label>{'Selector:'}</Label>

      <InputField
        placeholder={'Default: *, *::after, *::before'}
        {...register('selector')}
      />
    </FormWrapper>
  );
}
