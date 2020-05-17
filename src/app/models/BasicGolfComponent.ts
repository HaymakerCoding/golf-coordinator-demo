import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Trip } from '../models/Trip';
import { TripService } from '../services/trip.service';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/Player';

/**
 * Basic functions needed for each of the golf pages
 */
export abstract class BasicGolfComponent {

    subscriptions: Subscription[] = [];
    tripId: number;
    trip: Trip
    loading: boolean;
    players: Player[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private tripService: TripService,
        private playerService: PlayerService
    ) {}

    /**
     * Get the Trip ID we are working with from the route params
     */
    getId() {
        this.activatedRoute.params.subscribe((params: Params) => {
        this.tripId = +params['id'];
        this.getTrip();
        });
    }

    /**
     * Get all data for the current trip selected
     */
    getTrip() {
        this.subscriptions.push(this.tripService.get(this.tripId.toString()).subscribe(response => {
        if (response.status === 200) {
            this.trip = response.payload;
        } else {
            console.error(response);
        }
        this.getPlayers()
        }));
    }

    /**
     * Get all players in the database, used to change coordinators
     */
    getPlayers() {
        this.subscriptions.push(this.playerService.getAll().subscribe(response => {
        if (response.status === 200) {
            this.players = response.payload;
        } else {
            console.error(response);
        }
        this.loading = false;
        }));
    }
}