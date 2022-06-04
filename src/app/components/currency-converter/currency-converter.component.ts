import { Component, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { CurrencyService } from "../../services/currency.service";
import { ICurrency } from "../../models/currency.model";

@Component({
    selector: 'app-currency-converter',
    templateUrl: './currency-converter.component.html',
    styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
    currenciesOptions: ICurrency[] = [];

    currencyFrom?: string;
    currencyTo?: string;

    amountFrom?: number;
    amountTo?: number;

    constructor(private currencyService: CurrencyService) {}
    
    ngOnInit(): void {
        this.setCurrenciesOptions();
    }

    setCurrenciesOptions(): void {
        this.currencyService.getCurrencies().subscribe((currencies) => {
            this.currenciesOptions = Object.values(currencies)
                .map((currency: ICurrency) => currency);

            if (this.currenciesOptions.length) {
                const [ { code: from }, { code: to } ] = this.currenciesOptions;
                this.currencyFrom = from;
                this.currencyTo = to;
            }
        });
    }

    currencyChanged(): void {
        if (this.currencyFrom && this.currencyTo && this.amountFrom) {
            this.convertCurrency(this.currencyFrom, this.currencyTo, this.amountFrom)
                .pipe(map(value => this.amountTo = value)).subscribe();
        }
    }

    amountToChanged(): void {
        if (this.currencyFrom && this.currencyTo && this.amountTo) {
            this.convertCurrency(this.currencyTo, this.currencyFrom, this.amountTo)
                .pipe(map(value => this.amountFrom = value)).subscribe();
        }
    }

    swapCurrencies(): void {
        [this.currencyFrom, this.currencyTo] = [this.currencyTo, this.currencyFrom];
        this.currencyChanged();
    }

    convertCurrency(from: string, to: string, amount: number): Observable<number> {
        return this.currencyService.getExchangeRate(from, to, amount);
    }
}