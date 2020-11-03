import { PipelineItemInterface, PipelineResult, TabEvent, TabInterface } from "../Types";
import Storage from "../Services/Storage";

class StartDistractionTrack implements PipelineItemInterface {
    
    async process({ url }: TabInterface, event: TabEvent): Promise<PipelineResult> {
        const { host } = new URL(url)
        Storage.set('distraction_time', new Date().toISOString())
        Storage.set('distraction_host', host)

        return PipelineResult.Continue;
    }
}

export default StartDistractionTrack