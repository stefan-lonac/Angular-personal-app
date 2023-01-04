import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbSidebarComponent,
  NbMenuComponent,
  NbMenuModule,
  NbButtonModule,
  NbTreeGridModule,
  NbSelectComponent,
  NbSelectModule,
  NbRadioComponent,
  NbRadioModule,
  NbInputModule,
  NbToggleComponent,
  NbToggleModule,
  NbCheckboxComponent,
  NbCheckboxModule,
  NbDialogModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbTreeGridModule,
    NbSelectModule,
    NbRadioModule,
    NbInputModule,
    NbToggleModule,
    NbCheckboxModule,
  ],
  providers: [
    NbSidebarComponent,
    NbMenuComponent,
    NbSelectComponent,
    NbRadioComponent,
    NbCheckboxComponent,
  ],
})
export class NebularModule {}
