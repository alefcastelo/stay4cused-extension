import { tabs } from 'webextension-polyfill'
import TabManager  from './Services/TabManager'
import Pipeline from './Services/PipelineManager'
import TabLimit from './Pipeline/TabLimit';
import BlockDistraction from './Pipeline/BlockDistraction';
import { TabEvent } from './Types';
import URLCheker from './Pipeline/URLCheker';

const tabManager = new TabManager();

tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await tabManager.getTabById(tabId)

  const pipeline = new Pipeline([
    new URLCheker(),
    new BlockDistraction()
  ]);

  pipeline.process(tab, TabEvent.OnUpdated)
})

tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const pipeline = new Pipeline([
    new URLCheker(),
    new BlockDistraction()
  ]);

  pipeline.process(tab, TabEvent.OnUpdated)
})

tabs.onCreated.addListener(async (tab) => {

  const pipeline = new Pipeline([
    new TabLimit()
  ]);

  pipeline.process(tab, TabEvent.New)
})
