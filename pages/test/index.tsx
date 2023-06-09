import React from 'react';
import style from './index.module.scss';
import { Sender } from '../Sender';

export default
function Test() {
  return <div className={style.page}>
    <div className={style.box}>
      <Sender />
    </div>
  </div>;
}
