declare module '*.svg' {
    import React = require('react');
    export const SvgComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
    const src: string;
    export default src;
  }