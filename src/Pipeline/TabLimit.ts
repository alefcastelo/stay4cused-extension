import { PipelineItemInterface, PipelineResult, TabEvent, TabInterface } from "../Types";
import TabManager from "../Services/TabManager";

class TabLimit implements PipelineItemInterface {
    
    async process({ id }: TabInterface, event: TabEvent): Promise<PipelineResult> {
        if (event !== TabEvent.New) {
            return PipelineResult.Fail
        }
        
        const tabManager = new TabManager();
        const total = await tabManager.getTotal()

        if (total > 10) {
            tabManager.blockTabById(id)
        }

        return PipelineResult.Success;
    }
}

export default TabLimit