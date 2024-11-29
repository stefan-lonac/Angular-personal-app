import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsSevice } from './item/item.service';

import { DeleteDialogComponent } from './item/delete-dialog/delete-dialog.component';
import { ApixuService } from './weather/apixu.service';
import { LengthClassDirective } from './shared/directive/length-class.directive';
import { MatCardModule } from '@angular/material/card';

import { HeaderComponent } from './header/header.component';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [AppComponent, DeleteDialogComponent, LengthClassDirective],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatCardModule,
    HeaderComponent,
  ],
  providers: [ItemsSevice, ApixuService],
  bootstrap: [AppComponent],
})
export class AppModule {}
