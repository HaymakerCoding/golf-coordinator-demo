import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../services/trip.service';
import { PlayerService } from '../services/player.service';
import { BasicGolfComponent } from '../models/BasicGolfComponent';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent extends BasicGolfComponent  {

  constructor(
    activatedRoute: ActivatedRoute,
    tripService: TripService,
    playerService: PlayerService
  ) { 
    super(activatedRoute, tripService, playerService)
  }

  ngOnInit(): void {
    this.loading = true;
    this.getId();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  

  

}
