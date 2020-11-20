import React from 'react';
import PropTypes from 'prop-types';
import './MainLayout.scss';

import { Link } from 'react-router-dom';
import Header from './Header';

const MainLayout = ({ children, title }) => {
  return (
    <div className="layout">
      <Header className="layout-header" />
      <main className="layout-main">
        <h2 className="layout-main--title">{title}</h2>
        <section className="layout-main--section">{children}</section>
      </main>
      <footer className="layout-footer">
        <p>&copy; Nodepop SPA {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default MainLayout;
