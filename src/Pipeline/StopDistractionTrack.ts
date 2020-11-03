import moment from 'moment'
import { PipelineItemInterface, PipelineResult, TabEvent, TabInterface } from "../Types";
import Storage from "../Services/Storage";

interface Distraction {
    host: string
    wasted: number
}

class StopDistractionTrack implements PipelineItemInterface {
    
    async process(tab: TabInterface, event: TabEvent): Promise<PipelineResult> {

        const timer = await Storage.get('distraction_time', null, (value) => moment(value))
        const host = await Storage.get('distraction_host', null)

        if (!host) {
            return PipelineResult.Continue;
        }

        const wasted = moment().diff(timer, 'seconds')

        const distractions: Distraction[] = Storage.get('history_distractions', [], (value) => JSON.parse(value))
        const distraction = distractions.find((distraction) => distraction.host === host)

        if (!distraction) {
            distractions.push({ host, wasted})
        } else {
            distractions.map((distraction: Distraction) => {
                if (distraction.host !== host) {
                    return
                }
    
                distraction.wasted = distraction.wasted + wasted
            })    
        }

        Storage.set('history_distractions', JSON.stringify(distractions), true)
        Storage.set('distraction_time', null, true)
        Storage.set('distraction_host', null, true)

        return PipelineResult.Continue;
    }
}

export default StopDistractionTrack