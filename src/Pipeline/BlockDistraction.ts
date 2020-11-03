import { PipelineItemInterface, PipelineResult, TabEvent, TabInterface } from "../Types";
import TabManager from "../Services/TabManager";

class BlockDistraction implements PipelineItemInterface {
    
    async process({ id, url }: TabInterface, event: TabEvent): Promise<PipelineResult> {

        const distractions = [
            "www.youtube.com",
            "www.netflix.com",
            "www.primevideo.com",
        ];

        const resource = new URL(url)

        if (!distractions.includes(resource.host)) {
            return PipelineResult.Continue
        }

        const tabManager = new TabManager();
        tabManager.blockTabById(id)

        return PipelineResult.Continue;
    }
}

export default BlockDistraction