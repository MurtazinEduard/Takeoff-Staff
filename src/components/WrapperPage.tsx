import React, { FC } from 'react';
import style from '../styles/Wrapper.module.sass'
type Props = {
  children: React.ReactNode;
};
const WrapperPage: FC<Props> = (props) => {
  return (
    <div className={style.Wrapper}>
      <div className={style.Wrapper_page}>{props.children}</div>
    </div>
  );
};

export default WrapperPage;
