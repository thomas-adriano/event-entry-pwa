import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ZebraPrinterService {
  constructor(public httpClient: HttpClient) {}

  private getProxyURL(proxyIP): string {
    return `https://${proxyIP}/proxy`;
  }
  public print(
    proxyIP: string,
    printerIP: string,
    content: string
  ): Observable<any> {
    if (this.isStringEmpty(printerIP) || this.isStringEmpty(content)) {
      throw Error('printerIP and content parameters are required.');
    }
    const body = { printerIP, content };
    return this.httpClient.post(this.getProxyURL(proxyIP), body);
  }

  public defaultTemplate(name: string = '', branch: string = ''): string {
    const nameLength = name.replace(/\s/g, '').length;
    if (nameLength > 20) {
      let newName = '';
      const splittedName = name.split(' ');
      let ix = 0;
      for (const word of splittedName) {
        if (ix === 0) {
          newName += word;
        } else if (ix === splittedName.length - 1) {
          newName += ' ' + word;
        } else if (word.length > 3 || word.length === 1) {
          // adiciona abreviacao do sobrenome apenas se for maior q 3 caracteres
          // ou se ja estiver abreviado
          newName += ' ' + word[0].toUpperCase() + '.';
        }
        ix++;
      }
      name = newName;
    }
    const templateStamp =
      '^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR5,5~SD15^JUS^LRN^CI0^XZ' +
      '^XA' +
      '^MMT' +
      '^PW831' +
      '^LL0480' +
      '^LS0' +
      '^FT766,268^A0I,56,55^FB711,1,0,C^FH^FD${name}^FS' +
      '^FT562,120^A0I,51,50^FB335,1,0,C^FH^FD${branch}^FS' +
      '^PQ1,0,1,Y^XZ;';
    if (name.trim().length) {
      return templateStamp
        .replace(/\$\{name\}/g, name)
        .replace(/\$\{branch\}/g, branch);
    } else {
      return templateStamp;
    }
  }

  private isStringEmpty(str: string): boolean {
    return !str || !str.trim().length;
  }
}
