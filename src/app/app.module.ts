import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TripComponent } from './trip/trip.component';
import { GroupsComponent } from './groups/groups.component';
import { PlayersComponent } from './players/players.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    TripComponent,
    GroupsComponent,
    PlayersComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatBottomSheetModule,
    MatSliderModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatChipsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatMenuModule
  ],
  providers: [],
  entryComponents: [ LoginComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
