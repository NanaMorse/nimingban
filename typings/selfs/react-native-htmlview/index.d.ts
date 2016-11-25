declare module 'react-native-htmlview' {

  interface HTMLViewProps {
    //  a string of HTML content to render
    value: string;

    // a function which will be called with a url when a link is pressed.
    // Passing this prop will override how links are handled
    // (defaults to calling Linking.openURL(url))
    onLinkPress?: Function;

    // a stylesheet object keyed by tag name
    // which will override the styles applied to those respective tags.
    stylesheet?: __React.StyleSheet;

    // a custom function to render HTML nodes however you see fit.
    // If the function returns undefined (not null),
    // the default renderer will be used for that node.
    renderNode?: Function;
  }

  export default class HTMLView extends __React.Component<HTMLViewProps, {}> {}
}