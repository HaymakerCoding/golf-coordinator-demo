import { Component, OnInit, OnDestroy } from '@angular/core';
import { TripService } from '../services/trip.service';
import { Subscription } from 'rxjs';
import { Trip } from '../models/Trip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  trips: Trip[];
  loading: boolean;
  

  constructor(
    private tripService: TripService,
    
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getAll();
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Get all available trips in database
   */
  getAll() {
    this.subscriptions.push(this.tripService.getAll().subscribe(response => {
      if (response.status === 200) {
        this.trips = response.payload;
      } else {
        console.error(response);
      }
      this.loading = false;
    }));
  }

  

  

}
