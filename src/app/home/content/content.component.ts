import { Component, OnInit, Input, OnChanges , SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {

  @Input() suggestionsFilteredList: string;
  constructor() { }

  ngOnInit() {
    // console.log('Onot List', this.suggestionsFilteredList);
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    // console.log('Changes', changes);
    console.log('Filtered List', this.suggestionsFilteredList);
  }

}
