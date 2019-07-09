/**
 * ```
 * 李鸿章 <poodll@163.com>
 * 6/27/2019, 3:57:15 PM
 * ```
 * doc comment of the file goes here
 */

/** */
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Spin } from 'antd';
// import Component from '_view/Component';

import { getData } from './fetch';

export default function Sign() {
  const loading = true;

  useEffect(() => {
    document.title = 'Sign in/up';
  }, []);

  return <div>Sign</div>;
}
