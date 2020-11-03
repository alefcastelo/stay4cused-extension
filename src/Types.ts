export interface TabInterface {
    id: number
    url: string
}

export enum TabEvent {
    New = 'new',
    OnActivated = 'onActivated',
    OnUpdated = 'onUpdated',
}

export enum PipelineResult {
    Stop = 'stop',
    Continue = 'Continue',
}

export interface PipelineItemInterface {
    process(tab: TabInterface, event: TabEvent): Promise<PipelineResult>
}