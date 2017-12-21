import * as React from 'react';
import { connect } from 'react-redux';
import { createPureComponent, PathUtils } from 'module/Common';
import { RouterSelector } from 'module/Redux/Router';
import { State } from 'module/Redux';

type StateProps = {
  lang: PathUtils.Lang;
};

const mapStateToProps = (s: State): StateProps => ({
  lang: RouterSelector.selectLang(s),
});

type Props = StateProps;

const NotFoundComp = createPureComponent<Props>('NotFoundComp', ({ lang }) => {
  return <div>404 - {lang}</div>;
});

export const NotFound = connect(mapStateToProps)(NotFoundComp);
