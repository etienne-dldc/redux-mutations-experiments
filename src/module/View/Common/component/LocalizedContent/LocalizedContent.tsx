import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'module/Redux';
import { RouterSelector } from 'module/Redux/Router';
import { Localized } from 'module/Model/Localized';
import { PathUtils, createPureComponent } from 'module/Common';

type StateProps = {
  lang: PathUtils.Lang;
};

const mapStateToProps = (s: State): StateProps => ({
  lang: RouterSelector.selectLang(s),
});

type OwnProps<C> = {
  content: Localized<C>;
  children: (content: C) => React.ReactNode;
};

type Props<C> = OwnProps<C> & StateProps;

const LocalizedContentComp = createPureComponent<Props<any>>('LocalizedContent', ({ lang, content, children }) => {
  return <>{children(Localized.get(content, lang))}</>;
});

export const LocalizedContent = connect(mapStateToProps)(LocalizedContentComp);
