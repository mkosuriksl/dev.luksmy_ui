import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
@Component({
  selector: 'app-search-person-details',
  templateUrl: './search-person-details.component.html',
  styleUrls: ['./search-person-details.component.css']
})
export class SearchPersonDetailsComponent implements OnInit{

  searchResults: any[] = [];
  category: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiserviceService) {

  }

  ngOnInit() {
    this.route.queryParams
    .pipe(take(1))
    .subscribe(params => {
      
      this.category = params['category'];
      console.log(this.category);
      this.searchPersons({});

    }
  );




  }

  searchPersons(params:any) {
    this.apiService.searchPerson(params).subscribe(res =>
      {
        this.searchResults = res.data;
        console.log(this.searchResults);
      });

  }



}
