import { PipelineItemInterface, PipelineResult, TabEvent, TabInterface } from "../Types";
import TabManager from "../Services/TabManager";

class BlockDistraction implements PipelineItemInterface {
    
    async process({ id, url }: TabInterface, event: TabEvent): Promise<PipelineResult> {
        const resource = new URL(url)

        if (resource.host !== 'www8.youtube.com') {
            return PipelineResult.Fail
        }

        const tabManager = new TabManager();
        tabManager.blockTabById(id)

        return PipelineResult.Success;
    }
}

export default BlockDistraction