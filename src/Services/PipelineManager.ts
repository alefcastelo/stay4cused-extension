import { PipelineItemInterface, PipelineResult, TabEvent, TabInterface } from '../Types'

class PipelineManager {
    stack: PipelineItemInterface[]
    
    constructor (stack: PipelineItemInterface[]) {
      this.stack = stack
    }

    async process (tab: TabInterface, event: TabEvent): Promise<void> {
      let canContinue = PipelineResult.Fail

      for (let item of this.stack) {
        canContinue = await item.process(tab, event)

        if (canContinue === PipelineResult.Fail) {
          break
        }
      }
    }
}

export default PipelineManager;