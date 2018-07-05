import { Injectable } from '@angular/core';
import { Person } from '../../core/models/person';

@Injectable()
export class StorageService {
  private static readonly APP_NAMESPACE = 'br.com.senior.sam.entryapp';
  private static readonly PRINTER_IP = 'printer_ip';
  private static readonly PRINTER_TEMPLATE = 'printer_template';
  private static readonly ACTIVE_PERSON = 'active_person';
  private static readonly ACTIVE_PERSON_PHOTO = 'active_person_photo';
  private static readonly CAMERA_WIDTH = 'camera_width';
  private static readonly CAMERA_HEIGHT = 'camera_height';
  private static readonly PROXY_IP = 'proxy_ip';

  constructor() {}

  public setCameraHeight(height: number) {
    localStorage.setItem(
      this.getKey(StorageService.CAMERA_HEIGHT),
      JSON.stringify(height)
    );
  }

  public removeCameraHeight() {
    localStorage.removeItem(this.getKey(StorageService.CAMERA_HEIGHT));
  }

  public getCameraHeight(): number {
    return parseInt(
      localStorage.getItem(this.getKey(StorageService.CAMERA_HEIGHT)),
      10
    );
  }

  public setCameraWidth(height: number) {
    localStorage.setItem(
      this.getKey(StorageService.CAMERA_WIDTH),
      JSON.stringify(height)
    );
  }

  public removeCameraWidth() {
    localStorage.removeItem(this.getKey(StorageService.CAMERA_WIDTH));
  }

  public getCameraWidth(): number {
    return parseInt(
      localStorage.getItem(this.getKey(StorageService.CAMERA_WIDTH)),
      10
    );
  }

  public setPrinterIp(printerIP: string) {
    localStorage.setItem(this.getKey(StorageService.PRINTER_IP), printerIP);
  }

  public setProxyIp(proxyIp: string) {
    localStorage.setItem(this.getKey(StorageService.PROXY_IP), proxyIp);
  }

  public getProxyIp() {
    return localStorage.getItem(this.getKey(StorageService.PROXY_IP));
  }

  public setPrinterTemplate(printerTemplate: string) {
    localStorage.setItem(
      this.getKey(StorageService.PRINTER_TEMPLATE),
      printerTemplate
    );
  }

  public setActivePerson(person: Person) {
    localStorage.setItem(StorageService.ACTIVE_PERSON, JSON.stringify(person));
  }

  public removeActivePerson() {
    localStorage.removeItem(StorageService.ACTIVE_PERSON);
  }

  public getActivePerson(): Person {
    return <Person>(
      JSON.parse(localStorage.getItem(StorageService.ACTIVE_PERSON))
    );
  }

  public setActivePersonPhoto(person: string) {
    localStorage.setItem(StorageService.ACTIVE_PERSON_PHOTO, person);
  }

  public removeActivePersonPhoto() {
    localStorage.removeItem(StorageService.ACTIVE_PERSON_PHOTO);
  }

  public getActivePersonPhoto() {
    return localStorage.getItem(StorageService.ACTIVE_PERSON_PHOTO);
  }

  public getPrinterIp(): string {
    return localStorage.getItem(this.getKey(StorageService.PRINTER_IP));
  }

  public getPrinterTemplate(): string {
    return localStorage.getItem(this.getKey(StorageService.PRINTER_TEMPLATE));
  }

  private getKey(field: string) {
    return StorageService.APP_NAMESPACE + '.' + field;
  }
}
