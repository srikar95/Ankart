import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
// import { Http , Response, RequestOptions} from '@angular/http';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string;
  model: string;
  suggestionsList: any;
  suggestionsFilteredList: any;
  selectedOption: string;
  params: any;
  filter_word: any;
  selectedGender: any;
  modelChanged: Subject<string> = new Subject<string>();

  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.name = localStorage.getItem('name') === 'null' ? localStorage.getItem('email').split('@')[0] : localStorage.getItem('name');

    // this.suggestionsList = ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'];

    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(model => {
        this.model = model;
        this.params = new HttpParams().set( 'keyword', this.model);
        if (this.model === '') {
          console.log('No value', this.model);
          this.suggestionsFilteredList = [];
        } else {
          this._filter(this.model);
        }
        // console.log(this.model);
      });
  }

  _filter(value: string) {

    // const filterValue = value.toLowerCase();
    // this.suggestionsFilteredList = this.suggestionsList.filter(option => option.toLowerCase().includes(filterValue));
    // console.log( this.suggestionsList.filter(option => option.toLowerCase().includes(filterValue)));
    // return this.suggestionsFilteredList;

    this.http.get('../../assets/allData.json', {params : this.params}).pipe(map(
      response => {
      this.filter_word = this.params.map.get('keyword')[0];
      var el = this;
      console.log('Before Modify', response);
      response = Object.values(response).filter( function(i) {
        i.name = i.url.split('../assets/images/')[1].split('.jpeg')[0];
        i.prodNum = Math.floor(Math.random() * 899999 + 100000);
        // console.log(i.name);
        return i.name.toLowerCase().includes(el.filter_word);
      });
      return response;
     }
       )).subscribe(response => {
        this.suggestionsFilteredList = response;
        console.log( this.suggestionsFilteredList );
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  displayChecked(event) {
    this.selectedGender = event;
    console.log('seen gender', event);
    if( event.includes('notMen')) {
      this.suggestionsFilteredList = [];
    } else {
      this.filterOnGender(this.selectedGender);
    }

  }

  filterOnGender(gender) {
    console.log('Filter Func', gender);

    this.http.get('../../assets/allData.json', {params : this.params}).pipe(map(
      response => {
        response = Object.values(response).filter(
          function(i) {
            i.name = i.url.split('../assets/images/')[1].split('.jpeg')[0];
            i.prodNum = Math.floor(Math.random() * 899999 + 100000);
            return i.giftFor.some(ele => gender.includes(ele));
          }
        );
        console.log('Home Response', response );
      return response;
     }
       )).subscribe(response => {


        this.suggestionsFilteredList = response;
        console.log('Home Filter List', this.suggestionsFilteredList );
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  selected(event) {

    this.selectedOption = event.option.value;
    console.log(event.option.value);
  }
  changed(text: string) {
    this.modelChanged.next(text);
}
}
