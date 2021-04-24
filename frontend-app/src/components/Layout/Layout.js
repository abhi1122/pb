import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

import Home from "../../containers/Home/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Category from "../../containers/Category/Category";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          {/* <Route
            path="/admin"
            exact
            render={() => <Redirect to="/admin/dashboard" />}
          /> */}
          <Route path="/home" exact component={Home} />
          <Route path="/category/:id" exact component={Category} />
          {/* <Route path="/admin/fonts" exact component={Fonts} />
          <Route path="/admin/fonts/add" exact component={FontsAdd} />
          <Route path="/admin/fonts/edit/:id" component={FontsAdd} />

          <Route path="/admin/categories" exact component={CategoryList} />
          <Route path="/admin/categories/add" exact component={CategoryAdd} />
          <Route
            path="/admin/categories/add-child/:id"
            component={CategoryAdd}
          />
          <Route
            key={Date.now()}
            path="/admin/categories/list-child/:id/:name"
            component={CategoryList}
          />
          <Route
            path="/admin/categories/edit-child/:id/:edit_id"
            component={CategoryAdd}
          />

          <Route path="/admin/template/add" exact component={TemplateAdd} />
          <Route path="/admin/template" exact component={TemplateList} />
          <Route path="/admin/template/edit/:id" component={TemplateAdd} /> */}
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default withRouter(connect(mapStateToProps)(Layout));
