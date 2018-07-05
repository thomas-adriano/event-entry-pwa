import { Component, OnInit } from '@angular/core';
import {
  StorageService,
  ZebraPrinterService,
  AppNavigationService
} from '../core';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-printer-config',
  templateUrl: './printer-config.component.html',
  styleUrls: ['./printer-config.component.scss']
})
export class PrinterConfigComponent implements OnInit {
  isPrinting = false;
  proxyIp: string;
  printer = {
    ip: '',
    textToPrint: ''
  };

  constructor(
    public storageService: StorageService,
    public zebraPrinterService: ZebraPrinterService,
    public navigationService: AppNavigationService
  ) {}

  ngOnInit() {
    const prevPrinterIp = this.storageService.getPrinterIp();
    const prevProxyIp = this.storageService.getProxyIp();
    const prevTemplate = this.storageService.getPrinterTemplate();

    if (prevPrinterIp) {
      this.printer.ip = prevPrinterIp;
    }
    if (prevProxyIp) {
      this.proxyIp = prevProxyIp;
    }
    this.printer.textToPrint =
      prevTemplate || this.zebraPrinterService.defaultTemplate();
  }

  public goToWelcome(evt) {
    this.navigationService.navigateTo('welcome');
  }

  onSubmit() {
    this.storageService.setPrinterIp(this.printer.ip);
    this.storageService.setProxyIp(this.proxyIp);
    if (this.printer.textToPrint && this.printer.textToPrint.trim().length) {
      this.storageService.setPrinterTemplate(this.printer.textToPrint);
      this.isPrinting = true;
      this.zebraPrinterService
        .print(this.proxyIp, this.printer.ip, this.printer.textToPrint)
        .subscribe(
          data => {
            alertify.logPosition('top right');
            alertify.success(
              '<span class="printer-config__msg-toast">Impressora configurada com sucesso! :)</span>'
            );
          },
          err => {
            alertify.error(
              '<span class="printer-config__msg-toast">Ocorreu um erro tentando configurar a impressora. :(</span>'
            );
            console.log(err);
          },
          () => {
            this.isPrinting = false;
          }
        );
    }
  }
}
