declare module '@radix-ui/react-menubar' {
  import * as React from 'react';

  // Radix primitives are usually forwardRef components; model them as such for typing
  type FRP<T = any> = React.ForwardRefExoticComponent<React.PropsWithoutRef<T> & React.RefAttributes<any>>;

  export const Root: FRP<any>;
  export const Menu: FRP<any>;
  export const Group: FRP<any>;
  export const Portal: FRP<any>;
  export const Sub: FRP<any>;
  export const RadioGroup: FRP<any>;
  export const Trigger: FRP<any>;
  export const SubTrigger: FRP<any>;
  export const SubContent: FRP<any>;
  export const Content: FRP<any>;
  export const Item: FRP<any>;
  export const CheckboxItem: FRP<any>;
  export const RadioItem: FRP<any>;
  export const Label: FRP<any>;
  export const Separator: FRP<any>;
  export const ItemIndicator: FRP<any>;

  export type Primitive = any;
  export default Root;
}