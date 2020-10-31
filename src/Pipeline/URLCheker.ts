import { PipelineItemInterface, PipelineResult, TabEvent, TabInterface } from "../Types";
import URLValidator from "../Utils/URLValidator";

class URLCheker implements PipelineItemInterface {
    
    async process({ url }: TabInterface, event: TabEvent): Promise<PipelineResult> {
        const resource = new URLValidator(url);

        if (!resource.isValid()) {
            PipelineResult.Fail
        }

        return PipelineResult.Success
    }
}

export default URLCheker