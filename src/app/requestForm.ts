import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface Role {
  name: string;
}

/**
 * @title Worksheet - To Be Named
 */

@Component({
  selector: 'requestForm',
  templateUrl: 'requestForm.html',
  styleUrls: ['requestForm.css']
})

export class requestForm implements OnInit {
  isLinear = false;
  testNameFormGroup: FormGroup;
  labInfoFormGroup: FormGroup;
  contactFormGroup: FormGroup;
  testInfoFormGroup: FormGroup;
  collectionInfoFormGroup: FormGroup;
  stabilityInfoFormGroup: FormGroup;
  reportInfoFormGroup: FormGroup;
  refRangeFormGroup: FormGroup;
  attachmentsFormGroup: FormGroup;
  submitFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {

        this.filteredRoles = this.rolectrl.valueChanges.pipe(
        startWith(null),
        map((role: string | null) => role ? this._filter(role) : this.allRoles.slice()));
    /**
    this.stabilityInfoFormGroup = this._formBuilder.group({
      
       conditions: this._formBuilder.array([]),
       stabilityCondition: '',
        
    });
    */
  }

task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Monday', completed: false, color: 'accent'},
      {name: 'Tuesday', completed: false, color: 'accent'},
      {name: 'Wednesday', completed: false, color: 'accent'},
      {name: 'Thursday', completed: false, color: 'accent'},
      {name: 'Friday', completed: false, color: 'accent'},
      {name: 'Saturday', completed: false, color: 'accent'},
      {name: 'Sunday', completed: false, color: 'accent'}
    ]
  };

  allComplete: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  tmp : boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  rolectrl = new FormControl();
  filteredRoles: Observable<string[]>;
  roles: string[] = [];
  allRoles: string[] = ['Specimen Reception', 'Operations Manager', 'Laboratory Scientist', 'Technical Specialist', 'Account Manager'];

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;



  ngOnInit() {
    this.testNameFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.labInfoFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.contactFormGroup = this._formBuilder.group({
      contactCtrl: ['', Validators.required]
    });
    this.testInfoFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      nextthirdCtrl: []
    });
    this.collectionInfoFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.stabilityInfoFormGroup = this._formBuilder.group({
        numberOfConditions: ['', Validators.required],
        stabilityCondition: ['', Validators.required],
        stabilityValue: ['', Validators.required],
        stabilityPeriod: ['', Validators.required],
      conditions: new FormArray([]),
    });
    this.reportInfoFormGroup = this._formBuilder.group({
      sixthCtrl: ['', Validators.required]
    });
    this.refRangeFormGroup = this._formBuilder.group({
      seventhCtrl: ['', Validators.required]
    });
    this.attachmentsFormGroup = this._formBuilder.group({
      eighthCtrl: ['', Validators.required]
    });
    this.reviewFormGroup = this._formBuilder.group({
      ninthCtrl: ['', Validators.required]
    });
    this.submitFormGroup = this._formBuilder.group({
      tenthCtrl: ['', Validators.required]
    });

  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  get f() { return this.stabilityInfoFormGroup.controls; }
  get t() { return this.f.conditions as FormArray; }
  get stabilityInfoFormGroups() { return this.t.controls as FormGroup[]; }

    onAddCondition() {
        this.t.push(this._formBuilder.group({
        numberOfConditions: ['', Validators.required],
        stabilityCondition: ['', Validators.required],
        stabilityValue: ['', Validators.required],
        stabilityPeriod: ['', Validators.required],
        }));
    }

    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }
    }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Role
    if ((value || '').trim()) {
      this.roles.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.rolectrl.setValue(null);
  }

  remove(role: string): void {
    const index = this.roles.indexOf(role);

    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push(event.option.viewValue);
    this.roleInput.nativeElement.value = '';
    this.rolectrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRoles.filter(role => role.toLowerCase().indexOf(filterValue) === 0);
  }

}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */