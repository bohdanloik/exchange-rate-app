import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ICurrencies, ICurrenciesResponse, ICurrencyConversion } from "../models/currency.model";
import { IRates, IRatesResponse } from "../models/rates.model";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class CurrencyService {
    constructor(private http: HttpClient) {}

    getRatesByCurrency(currency: string, symbols: string[] = []): Observable<IRates> {
        return this.http.get<IRatesResponse>(
            `${environment.api_url}/latest`,
            { params: { base: currency, symbols: symbols.join() } },
        ).pipe(map((res: IRatesResponse) => res.rates));
    }

    getCurrencies(): Observable<ICurrencies> {
        return this.http.get<ICurrenciesResponse>(`${environment.api_url}/symbols`)
            .pipe((map((res: ICurrenciesResponse) => res.symbols)));
    }

    getExchangeRate(from: string, to: string, amount: number = 1): Observable<number> {
        return this.http.get<ICurrencyConversion>(
            `${environment.api_url}/convert`,
            { params: { from, to, amount } }
        ).pipe(map((res: ICurrencyConversion) => res.result));
    }
}
