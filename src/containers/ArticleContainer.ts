import { connect } from 'react-redux';
import Article from '../components/Article';
import * as Actions from '../actions';

function mapStateToProps(state) {
  return state.article;
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

const ArticleContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default ArticleContainer;
