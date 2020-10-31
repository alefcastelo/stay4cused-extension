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
    Success = 'success',
    Fail = 'fail',
}

export interface PipelineItemInterface {
    process(tab: TabInterface, event: TabEvent): Promise<PipelineResult>
}