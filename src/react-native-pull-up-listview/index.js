import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  PanResponder,
  ActivityIndicator
} from 'react-native';

const PropTypes = React.PropTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const STATUS_NORMAL = 0;
const STATUS_PRE_LOAD = 1;
const STATUS_CANCEL_LOAD = 2;
const STATUS_LOADING = 3;

class PullUpListView extends React.Component {

  constructor(props) {
    super();

    this.state = {
      statusCode: props.loading ? STATUS_LOADING : STATUS_NORMAL,
      refreshing: false
    };

    this.responderHandling = false;
    this.containerSize = {};
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onPanResponderMove: () => {
        this.responderHandling = true;

        // todo if current move direction is to scroll down, try to cancel load more
/*        if (gestureState.vy > 0 ) {
          if (!this.state.statusCode === STATUS_PRE_LOAD) return;

          this.setState({
            statusCode: STATUS_CANCEL_LOAD
          });
        } else {
          if (!this.state.statusCode === STATUS_CANCEL_LOAD) return;

          this.setState({
            statusCode: STATUS_PRE_LOAD
          });
        }*/
      },

      onPanResponderRelease: () => {

        this.responderHandling = false;

        // todo check if use cancel
        if (this.state.statusCode === STATUS_PRE_LOAD) {
          this.props.onLoadMore && this.props.onLoadMore();
        }
      }
    });
  }

  componentDidMount() {
    // register all methods for listView
    const methodsList = [
      'getMetrics', 'scrollTo'
    ];

    methodsList.forEach((method) => {
      this[method] = (...args) => {
        this.listViewRef[method](...args);
      }
    });
  }

  componentWillUpdate(props) {
    this.state.statusCode = props.loading ? STATUS_LOADING : STATUS_NORMAL;
  }

  renderFooter() {

    if (!this.props.onLoadMore) return;

    const statusCode = this.state.statusCode;

    let footerContext;

    if (statusCode === STATUS_NORMAL) return null;

    if (statusCode === STATUS_PRE_LOAD) {
      footerContext = this.props.preLoadElement || (
          <Text>{this.props.preLoadTitle}</Text>
        );
    }

    if (statusCode === STATUS_CANCEL_LOAD) {
      footerContext = this.props.cancelLoadElement || (
          <Text>{this.props.cancelLoadTitle}</Text>
        );
    }

    if (statusCode === STATUS_LOADING) {
      footerContext = this.props.loadingElement || (
          <View>
            <ActivityIndicator
              size='large'
              animating={true}/>
            <Text>{this.props.loadingTitle}</Text>
          </View>
        );
    }

    return (
      <View style={styles.footer}>
        {footerContext}
      </View>
    );
  }

  onScroll(e) {
    const { contentSize, contentOffset } = e.nativeEvent;

    const containerHeight = this.containerSize.height;
    const contentHeight = contentSize.height;

    const OFFSET_Y_MAX = containerHeight > contentHeight ? 0 : contentHeight - containerHeight;

    if (contentOffset.y > (OFFSET_Y_MAX + this.props.pullDistance) && this.responderHandling) {
      if (this.state.statusCode === STATUS_NORMAL) {
        this.setState({
          statusCode: STATUS_PRE_LOAD
        });
      }
    }
  }

  onContainerLayout(e) {
    this.containerSize = e.nativeEvent.layout;
  }

  render() {
    const containerProps = {
      onLayout: this.onContainerLayout.bind(this),
      style: [styles.container, this.props.style]
    };

    const listViewProps = {
      dataSource: this.props.dataSource,
      renderRow: this.props.renderRow,
      refreshControl: this.props.refreshControl || null,

      renderFooter: this.renderFooter.bind(this),
      onScroll: mixFuncs(this.onScroll.bind(this), this.props.onScroll),
      onLoading: this.props.onLoading,

      ref: (listView) => { this.listViewRef = listView; },
    };

    return (
      <View {...containerProps}>
        <ListView {...this.props} {...this.panResponder.panHandlers} {...listViewProps}/>
      </View>
    );
  }
}

function mixFuncs(...funcs) {
  return (...args) => {
    funcs.forEach(func => func && func(...args));
  }
}

PullUpListView.propTypes = {
  dataSource: PropTypes.any,
  renderRow: PropTypes.func,
  refreshControl: PropTypes.element,
  pullDistance: PropTypes.number,
  style: PropTypes.any,

  preLoadElement: PropTypes.element,
  preLoadStyle: PropTypes.any,
  preLoadTitle: PropTypes.string,

  cancelLoadElement: PropTypes.element,
  cancelLoadStyle: PropTypes.any,
  cancelLoadTitle: PropTypes.string,

  loadingElement: PropTypes.element,
  loadingStyle: PropTypes.any,
  loadingTitle: PropTypes.string,

  loading: PropTypes.bool,
  onLoadMore: PropTypes.func
};

PullUpListView.defaultProps = {
  pullDistance: 25,
  preLoadTitle: 'Release to Load More',
  cancelLoadTitle: 'Release to Cancel',
  loadingTitle: 'Load More...'
};




export default PullUpListView;