import { PipelineItemInterface, PipelineResult, TabEvent, TabInterface } from "../Types";
import TabManager from "../Services/TabManager";
import Storage from "../Services/Storage";

class TabLimit implements PipelineItemInterface {
    
    async process({ id }: TabInterface, event: TabEvent): Promise<PipelineResult> {
        if (event !== TabEvent.New) {
            return PipelineResult.Continue
        }

        const tabLimit = await Storage.get('tab_limit', null, value => JSON.parse(value))

        if (tabLimit === null) {
            return PipelineResult.Continue
        }
        
        const tabManager = new TabManager();
        const total = await tabManager.getTotal()

        if (tabLimit.active === true && total > tabLimit.limit) {
            tabManager.blockTabById(id)
        }

        return PipelineResult.Continue;
    }
}

export default TabLimit