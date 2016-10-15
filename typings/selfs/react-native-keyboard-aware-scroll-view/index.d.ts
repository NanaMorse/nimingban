
declare module 'react-native-keyboard-aware-scroll-view' {
  interface scrollProps {
    // Adds an extra offset that represents the TabBarIOS height.
    viewIsInsideTabBar?: boolean;

    // Coordinates that will be used to reset the scroll when the keyboard hides.
    resetScrollToCoords?: {x: number, y: number};

    // When focus in TextInput will scroll the position, default is enabled.
    enableAutoAutomaticScroll?: boolean;

    // Adds an extra offset
    extraHeight?: number;
  }

  export class KeyboardAwareListView extends __React.Component<scrollProps, {}> {}

  export class KeyboardAwareScrollView extends __React.Component<scrollProps, {}> {}
}