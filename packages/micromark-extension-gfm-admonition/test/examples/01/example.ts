import { micromark } from 'micromark';
import {
  gfmCallout, gfmCalloutHtml
} from '@it-service-npm/micromark-extension-gfm-admonition';

export function micromarkUsingExample(markdown: string): string {
  return micromark(
    markdown,
    {
      extensions: [gfmCallout()],
      htmlExtensions: [gfmCalloutHtml()],
    }
  );
};
