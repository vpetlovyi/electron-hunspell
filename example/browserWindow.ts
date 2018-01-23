import * as path from 'path';
import { enableLogger, SpellCheckerProvider } from '../src/index';

enableLogger(console);

const init = async () => {
  const browserWindowProvider = new SpellCheckerProvider();
  browserWindowProvider.verboseLog = true;

  (window as any).browserWindowProvider = browserWindowProvider;
  await browserWindowProvider.initialize();

  await browserWindowProvider.loadDictionary(
    'en-us',
    path.join(path.resolve('./'), 'en-US.dic'),
    path.join(path.resolve('./'), 'en-US.aff')
  );

  await browserWindowProvider.loadDictionary(
    'en-gb',
    path.join(path.resolve('./'), 'en-gb.dic'),
    path.join(path.resolve('./'), 'en-gb.aff')
  );

  //run spell check against en-US and en-GB both, while en-US is primary dictionary
  browserWindowProvider.switchDictionary('en-us', true);
};

init();
