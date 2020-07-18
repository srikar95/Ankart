import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Output() checked: EventEmitter<Array<{}>> = new EventEmitter<Array<{}>>();
  value: string;
  genderArray: any[] = [];
  isChecked: Boolean= false;
  isCheckedW: Boolean= false;
  isCheckedK: Boolean= false;
  isCheckedF: Boolean= false;
  isCheckedE: Boolean= false;

  genderValues: [
    {name: 'men', completed: false, color: 'primary'},
    {name: 'women', completed: false, color: 'accent'},
    {name: 'kids', completed: false, color: 'warn'}
  ];
  constructor() { }

  ngOnInit() {
  }

  checkedEvent(option) {
    console.log('option', option);
    if (option === 'notMen') {
      var indMen = this.genderArray.indexOf('men');
      this.genderArray.splice(indMen, 1);
      this.checked.emit(this.genderArray);
    } else if (option === 'notWomen') {
      var indMen = this.genderArray.indexOf('women');
      this.genderArray.splice(indMen, 1);
      this.checked.emit(this.genderArray);

    } else if (option === 'notKids') {
      var indMen = this.genderArray.indexOf('kids');
      this.genderArray.splice(indMen, 1);
      this.checked.emit(this.genderArray);

    } else if (option === 'notFriends') {
      var indMen = this.genderArray.indexOf('friends');
      this.genderArray.splice(indMen, 1);
      this.checked.emit(this.genderArray);
    } else if (option === 'notElders') {
      var indMen = this.genderArray.indexOf('elders');
      this.genderArray.splice(indMen, 1);
      this.checked.emit(this.genderArray);
    } else if (option === 'all') {
      this.isChecked = true;
      this.isCheckedW = true;
      this.isCheckedK = true;
      this.isCheckedF = true;
      this.isCheckedE = true;
      // var indMen = this.genderArray.indexOf('elders');
      // this.genderArray.splice(indMen, 1);
      this.genderArray = ['men', 'women', 'kids', 'friends', 'elders'];
      this.checked.emit(this.genderArray);
    } else if (option === 'notAll') {
      this.isChecked = false;
      this.isCheckedW = false;
      this.isCheckedK = false;
      this.isCheckedF = false;
      this.isCheckedE = false;
      // var indMen = this.genderArray.indexOf('elders');
      // this.genderArray.splice(indMen, 1);
      this.genderArray = [];
      this.checked.emit(this.genderArray);
    } else {
      this.genderArray.push(option);
      this.checked.emit(this.genderArray);
    }
  }
}
