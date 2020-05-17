import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TripComponent } from './trip/trip.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { PlayersComponent } from './players/players.component';
import { GroupsComponent } from './groups/groups.component';


const routes: Routes = [
  { path: 'list', component: ListComponent, canActivate: [AuthGuardService] },
  { path: 'trip/:id', component: TripComponent, canActivate: [AuthGuardService] },
  { path: 'thankyou', component: ThankYouComponent },
  { path: 'trip/:id/players', component: PlayersComponent, canActivate: [AuthGuardService] },
  { path: 'trip/:id/groups', component: GroupsComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
