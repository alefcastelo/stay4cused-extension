import { PipelineItemInterface, PipelineResult, TabEvent, TabInterface } from '../Types'

class PipelineManager {
    stack: PipelineItemInterface[]
    
    constructor (stack: PipelineItemInterface[]) {
      this.stack = stack
    }

    async process (tab: TabInterface, event: TabEvent): Promise<void> {
      let canContinue = PipelineResult.Stop

      for (let item of this.stack) {
        canContinue = await item.process(tab, event)

        if (canContinue === PipelineResult.Stop) {
          break
        }
      }
    }
}

export default PipelineManager;