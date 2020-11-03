import { tabs } from 'webextension-polyfill'
import TabManager  from './Services/TabManager'
import Pipeline from './Services/PipelineManager'
import StopDistractionTrack from './Pipeline/StopDistractionTrack';
import StartDistractionTrack from './Pipeline/StartDistractionTrack';
import TabLimit from './Pipeline/TabLimit';
import BlockDistraction from './Pipeline/BlockDistraction';
import { TabEvent } from './Types';
import URLCheker from './Pipeline/URLCheker';
import CountdownChecker from './Pipeline/CountdownChecker';

const tabManager = new TabManager();

tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await tabManager.getTabById(tabId)

  const pipeline = new Pipeline([
    new URLCheker(),
    new StopDistractionTrack(),
    new StartDistractionTrack(),
    new CountdownChecker(),
    new BlockDistraction()
  ]);

  pipeline.process(tab, TabEvent.OnUpdated)
})

tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const pipeline = new Pipeline([
    new URLCheker(),
    new StopDistractionTrack(),
    new StartDistractionTrack(),
    new CountdownChecker(),
    new BlockDistraction()
  ]);

  pipeline.process(tab, TabEvent.OnUpdated)
})

tabs.onCreated.addListener(async (tab) => {

  const pipeline = new Pipeline([
    new TabLimit(),
    new URLCheker(),
    new StopDistractionTrack(),
    new StartDistractionTrack(),
    new CountdownChecker(),
    new BlockDistraction()
  ]);

  pipeline.process(tab, TabEvent.New)
})
