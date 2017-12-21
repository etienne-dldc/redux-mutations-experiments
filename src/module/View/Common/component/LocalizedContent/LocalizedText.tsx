import * as React from 'react';
import { Localized } from 'module/Model/Localized';
import { createPureComponent } from 'module/Common';
import { LocalizedContent } from './LocalizedContent';

type Props = {
  content: Localized<string>;
};

export const LocalizedText = createPureComponent<Props>('LocalizedText', ({ content }) => {
  return <LocalizedContent content={content}>{c => c}</LocalizedContent>;
});
