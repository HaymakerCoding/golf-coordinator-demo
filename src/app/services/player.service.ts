import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getAll() {
    const URL = 'http://demo-golf-coordinator.haymakercoding.com/api/player/get-all/index.php';
    return this.http.get<any>(URL)
    .pipe(map(response => {
      return response;
    }))
  }
}
