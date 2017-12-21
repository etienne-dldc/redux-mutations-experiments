import * as React from 'react';
import { MainLayout, detectors as viewDetectors } from 'module/View';
import { app } from './app';
import { reducer as menuReducer } from 'module/Redux/Menu';
import { reducer as categoriesReducer } from 'module/Redux/Categories';
import { reducer as pageListReducer } from 'module/Redux/PageList';
import { reducer as postListReducer } from 'module/Redux/PostList';
import { reducer as pageReducer } from 'module/Redux/Page';
import { reducer as postReducer } from 'module/Redux/Post';
import { reducer as mainReducer } from 'module/Redux/Main';

app.registerReducer('main', mainReducer);
app.registerReducer('menu', menuReducer);
app.registerReducer('categories', categoriesReducer);
app.registerReducer('pageList', pageListReducer);
app.registerReducer('page', pageReducer);
app.registerReducer('postList', postListReducer);
app.registerReducer('post', postReducer);
app.registerDetectors('view', viewDetectors);
app.boot({
  appComponent: <MainLayout />,
  element: document.getElementById('root'),
});
