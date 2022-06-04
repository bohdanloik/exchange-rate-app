import { Component, OnInit } from "@angular/core";
import { CurrencyService } from "../../services/currency.service";
import { IRates } from "../../models/rates.model";

@Component({
    selector: 'app-exchange-rates-list',
    templateUrl: './exchange-rates-list.component.html',
    styleUrls: ['./exchange-rates-list.component.scss'],
})
export class ExchangeRatesListComponent implements OnInit {
    baseCurrency: string = 'UAH';
    rates?: IRates;

    constructor(private currencyService : CurrencyService) {}
    
    ngOnInit(): void {
        this.currencyService.getRatesByCurrency(this.baseCurrency, ['USD', 'EUR', 'PLN'])
            .subscribe((rates) => this.rates = rates);
    }
}