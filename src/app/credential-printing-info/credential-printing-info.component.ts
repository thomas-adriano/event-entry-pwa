import { Component, OnInit, AfterViewInit } from '@angular/core';
import { setTimeout } from 'timers';
import * as alertify from 'alertify.js';
import {
  AppNavigationService,
  ZebraPrinterService,
  StorageService
} from '@app/core';

@Component({
  selector: 'app-credential-printing-info',
  templateUrl: './credential-printing-info.component.html',
  styleUrls: ['./credential-printing-info.component.scss']
})
export class CredentialPrintingInfoComponent implements AfterViewInit {
  constructor(
    private navigationService: AppNavigationService,
    private zebraPrinterService: ZebraPrinterService,
    private storage: StorageService
  ) {}

  ngAfterViewInit() {
    try {
      const proxyIp = this.storage.getProxyIp();
      const printerIp = this.storage.getPrinterIp();
      const activePerson = this.storage.getActivePerson();
      if (!activePerson.name || !activePerson.name.trim().length) {
        this.printingNotPossibleError();
        return;
      }
      this.zebraPrinterService
        .print(
          proxyIp,
          printerIp,
          this.zebraPrinterService.defaultTemplate(
            activePerson.name,
            activePerson.branch
          )
        )
        .subscribe(
          data => {
            this.navigationService.navigateTo(
              'credential-withdrawal',
              {},
              1000
            );
          },
          err => {
            this.printingNotPossibleError();
            this.navigationService.navigateTo(
              'help',
              {
                errorMsg: `Problemas com a impressora ${printerIp} ou com o proxy ${proxyIp}.`
              },
              3000
            );
          }
        );
    } catch (e) {
      this.navigationService.navigateTo(
        'help',
        {
          errorMsg: `Erro tentando imprimir credenciais. As configurações de impressão foram feitas? ${e}`
        },
        3000
      );
    }
  }

  private printingNotPossibleError() {
    alertify.logPosition('top right');
    alertify.error(
      '<span class="printer-config__msg-toast">Não foi possível imprimir sua etiqueta. :(</span>'
    );
  }
}
