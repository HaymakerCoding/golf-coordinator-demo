import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Trip } from '../models/Trip';

/**
 * This service provides the database CRUD operations on Trips
 * 
 * @author Malcolm Roy
 */
@Injectable({
  providedIn: 'root'
})
export class TripService {

  protected trips: Trip[];

  constructor(
    private http: HttpClient
  ) { }

  getTrips() {
    return this.trips;
  }

  getAll() {
    const URL = 'http://demo-golf-coordinator.haymakercoding.com/api/trip/get-all/index.php';
    return this.http.get<any>(URL)
    .pipe(map(response => {
      this.trips = response.payload;
      return response;
    }))
  }

  get(id: string) {
    const URL = 'http://demo-golf-coordinator.haymakercoding.com/api/trip/get/index.php';
    const params = new HttpParams().set('id', id);
    return this.http.get<any>(URL, { params })
    .pipe(map(response => {
      return response;
    }))
  }

  update(trip: Trip) {
    const URL = 'http://demo-golf-coordinator.haymakercoding.com/api/trip/update/index.php';
    return this.http.patch<any>(URL,  trip )
    .pipe(map(response => {
      return response;
    }))
  }
  

}
