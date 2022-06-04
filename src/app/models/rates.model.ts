export interface IRates {
    [x: string]: number;
}

export interface IRatesResponse {
    base: string;
    rates: IRates;
}
