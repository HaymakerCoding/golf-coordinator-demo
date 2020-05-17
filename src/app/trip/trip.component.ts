import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TripService } from '../services/trip.service';
import { Trip } from '../models/Trip';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Player } from '../models/Player';
import { PlayerService } from '../services/player.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The main page for a golf trip.
 * User can edit a few details like coordinator and date and navigate into deeper functions from here
 * 
 * @author Malcolm Roy
 */
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  loading: boolean;
  trip: Trip;
  tripId: number;
  dialogRef: MatDialogRef<any>;
  players: Player[];
  originalTripDate: any;
  originalTripCoordinator: number;
  unsavedChanges: boolean;

  constructor(
    private tripService: TripService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private playerService: PlayerService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.unsavedChanges = false;
    this.loading = true;
    this.getId();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

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
        this.originalTripDate = this.trip.tripDate;
        this.originalTripCoordinator = +this.trip.coordinator;
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

  /**
   * Show a generic edit dialog for changing the coordinator or date of the trip
   * @param dialog Template ref to open
   * @param data Data to pass to dialog, Trip
   */
  showEditDialog(dialog, type: string) {
    let title: string;
    if (type === 'date') {
      title = 'Date Change';
    } else {
      title = 'Coordinator Change';
    }
    this.dialogRef = this.dialog.open(dialog, { data: { type, trip: this.trip, title} });
  }

  /**
   * Update the trip record in database with any in memory changes to it
   */
  saveChanges() {
    this.subscriptions.push(this.tripService.update(this.trip).subscribe(response => {
      if (response.status === 200) {
        this.unsavedChanges = false;
        this.snackbar.open('Changes saved!', '', { duration: 1200 });
      } else {
        console.error(response);
      }
    }));
  }

  /**
   * User is done making a change, flag unsaved changes and close edit dialog
   */
  done() {
    if (this.originalTripDate !== this.trip.tripDate || this.originalTripCoordinator !== +this.trip.coordinator) {
      this.unsavedChanges = true;
    }
    this.close();
  }

  /**
   * When coordinator changes the data binding auto adjusts the id but we need to set the new coordinator name
   */
  onCoordiantorChange() {
    this.trip.coordinatorName = this.players.find( x => +x.id === +this.trip.coordinator).name;
  }

  /**
   * Close the currently open dialog
   */
  close() {
    this.dialogRef.close();
  }

}
