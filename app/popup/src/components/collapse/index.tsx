/**
 * Module dependencies
 */

import { ReactNode, useState } from "react";
import { ifNotProp, ifProp } from "styled-tools";
import DownOutlined from '@ant-design/icons/DownOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import styled from "styled-components";

/**
 * `Props` type. 
 */

type Props = {
  children: ReactNode;
  header: ReactNode;
}

/**
 * CollapseStyle
 */

export const CollapseStyle = styled.div<{ expanded: boolean }>`
  display: grid;
  grid-template-rows: ${ifProp('expanded', 1, 0)}fr;
  transition-property: grid-template-rows;
  transition: 0.4s ease-in-out;
`;

/**
 * InnerCollapse
 */

export const InnerCollapse = styled.div`
  overflow: hidden;
`;

/**
 * CollapseHeader
 */

export const CollapseHeader = styled.div<{ expanded: boolean }>`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: auto 1fr auto;
  padding: 4px 0;
  transition-property: opacity;
  transition: 0.4s linear;

  .anticon svg {
    transition: transform 0.4s ease;
  }

  ${ifNotProp(
    'expanded',
    `
    opacity: 0.6;
  `
  )}
`;

/**
 * Export `Collapse` component.
 */

export const Collapse = ({ children, header }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <CollapseHeader
        expanded={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <SettingOutlined />

        {header}

        <DownOutlined rotate={isOpen ? 180 : 0} />
      </CollapseHeader>

      <CollapseStyle expanded={isOpen}>
        <InnerCollapse>{children}</InnerCollapse>
      </CollapseStyle>
    </>
  );
}
