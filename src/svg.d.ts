declare module '*.svg' {
    import React = require('react');
    export const SvgComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }