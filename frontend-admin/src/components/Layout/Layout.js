import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'rc-hammerjs';

import UIIcons from '../../pages/components/icons';
import UINotifications from '../../pages/notifications';
import TablesStatic from '../../pages/tables/static';
import MapsGoogle from '../../pages/components/maps/google';
import CoreTypography from '../../pages/typography';
import Charts from '../../pages/components/charts/Charts';
import Dashboard from '../../pages/dashboard';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fonts from '../../pages/fonts';
import FontsAdd from '../../pages/fonts/add.component';

import CategoryList from '../../pages/category/category.list.component';
import CategoryAdd from '../../pages/category/category.add.component';
import TemplateAdd from '../../pages/templates/TemplateAdd';
import TemplateList from '../../pages/templates/TemplateList';

import Header from '../Header';
import Sidebar from '../Sidebar';
import BreadcrumbHistory from '../BreadcrumbHistory';
import { openSidebar, closeSidebar } from '../../actions/navigation';
import s from './Layout.module.scss';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };
  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }

  handleSwipe(e) {
    if ('ontouchstart' in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          'sidebar-' + this.props.sidebarPosition,
          'sidebar-' + this.props.sidebarVisibility,
        ].join(' ')}
      >
        <Backdrop
          open={this.props.loading}
          style={{ zIndex: 1000000, color: '#fff' }}
        >
          <CircularProgress color='inherit' />
        </Backdrop>

        <div className={s.wrap}>
          <Header />
          {/* <Chat chatOpen={this.state.chatOpen} /> */}
          {/* <Helper /> */}
          <Sidebar />
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames='fade'
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path='/'
                      exact
                      render={() => <Redirect to='/admin/dashboard' />}
                    />
                    <Route
                      path='/admin'
                      exact
                      render={() => <Redirect to='/admin/dashboard' />}
                    />
                    <Route
                      path='/admin/dashboard'
                      exact
                      component={Dashboard}
                    />
                    <Route path='/admin/fonts' exact component={Fonts} />
                    <Route path='/admin/fonts/add' exact component={FontsAdd} />
                    <Route path='/admin/fonts/edit/:id' component={FontsAdd} />

                    <Route
                      path='/admin/categories'
                      exact
                      component={CategoryList}
                    />
                    <Route
                      path='/admin/categories/add'
                      exact
                      component={CategoryAdd}
                    />
                    <Route
                      path='/admin/categories/add-child/:id'
                      component={CategoryAdd}
                    />
                    <Route
                      key={Date.now()}
                      path='/admin/categories/list-child/:id/:name'
                      component={CategoryList}
                    />

                    <Route
                      path='/admin/template/add'
                      exact
                      component={TemplateAdd}
                    />
                    <Route
                      path='/admin/template'
                      exact
                      component={TemplateList}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}></footer>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
    loading: store.core.loading,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
