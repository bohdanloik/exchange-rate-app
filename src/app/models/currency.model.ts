export interface ICurrency {
    code: string;
    description: string;
}

export interface ICurrencies {
    [x: string]: ICurrency;
}

export interface ICurrenciesResponse {
    symbols: { [x: string]: ICurrency };
}

export interface ICurrencyConversion {
    result: number;
}
