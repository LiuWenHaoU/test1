/**
 * 李鸿章 <poodll@163.com>
 * 6/27/2019, 3:57:15 PM
 */

import fetch from '_fetch';

export function getData(page, size) {
  return fetch(`/Mx000/sign/${page}/${size}?page=${page}&size=${size}`);
}
