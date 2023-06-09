import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit{
  public payPalConfig ? : IPayPalConfig;

  constructor(private router: Router){}


    ngOnInit(): void {
        this.initConfig();
  }

    private initConfig(): void {
      this.payPalConfig = {
          currency: 'USD',
          clientId: 'ARooenWYUZl4z1ULpHq3Z7AOuUqdW-gkjYIwPW-yK9XvXU_EvqHxSUeIxlIWOstNiYZ4D7vSW8iGppxM',
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'USD',
                      value: '9.99',
                      breakdown: {
                          item_total: {
                              currency_code: 'USD',
                              value: '9.99'
                          }
                      }
                  },
                  items: [{
                      name: 'Enterprise Subscription',
                      quantity: '1',
                      category: 'DIGITAL_GOODS',
                      unit_amount: {
                          currency_code: 'USD',
                          value: '9.99',
                      },
                  }]
              }]
          },
          advanced: {
              commit: 'true'
          },
          style: {
              label: 'paypal',
              layout: 'vertical'
          },
          onApprove: (data, actions) => {
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
              actions.order.get().then((details: any) => {
                  console.log('onApprove - you can get full order details inside onApprove: ', details);
              });
              this.router.navigate(['/login']);

          },
          onClientAuthorization: (data) => {
              console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);

          },
          onError: err => {
              console.log('OnError', err);
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
          }
      };
  }
}
