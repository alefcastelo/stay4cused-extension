import { PipelineItemInterface, PipelineResult, TabEvent, TabInterface } from "../Types";
import Countdown from "../Services/Countdown";

class CountdownChecker implements PipelineItemInterface {
    
    async process({ id, url }: TabInterface, event: TabEvent): Promise<PipelineResult> {
        const countdown = new Countdown()

        if (!countdown.isRunning()) {
            return PipelineResult.Stop
        }

        return PipelineResult.Continue;
    }
}

export default CountdownChecker