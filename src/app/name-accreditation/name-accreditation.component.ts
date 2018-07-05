import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import {
  Person,
  StorageService,
  AppNavigationService,
  splitCamelCase
} from '@app/core';

@Component({
  selector: 'app-name-accreditation',
  templateUrl: './name-accreditation.component.html',
  styleUrls: ['./name-accreditation.component.scss']
})
export class NameAccreditationComponent implements OnInit {
  stepDescription = 'Digite seu nome:';
  interactionBoxStatus = 'normal';
  nameAccreditationForm: FormGroup;
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    public database: AngularFireDatabase,
    public fb: FormBuilder,
    public storage: StorageService,
    public navigationService: AppNavigationService
  ) {}

  ngOnInit() {
    this.nameAccreditationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.filteredOptions = this.nameAccreditationForm
      .get('name')
      .valueChanges.pipe(
        startWith(''),
        map(val => this.filter(val))
      );

    this.database
      .list('/')
      .stateChanges()
      .subscribe(val => {
        this.options.push(splitCamelCase(val.key));
      });
  }

  onOptionSelected(opt: MatAutocompleteSelectedEvent) {
    const p = new Person(undefined, opt.option.value, undefined);
    this.storage.setActivePerson(p);
  }

  nextPage() {
    this.navigationService.navigateTo('pos-accreditation');
  }

  submitDisabled() {
    return (
      this.nameAccreditationForm.get('name').pristine ||
      !this.nameAccreditationForm.get('name').valid
    );
  }

  isErrorStatus() {
    return false;
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase())
    );
  }
}
