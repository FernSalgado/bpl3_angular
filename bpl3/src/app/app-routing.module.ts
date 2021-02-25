import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { CommunityComponent } from './community/community.component';


const routes: Routes = [
  { path:'', redirectTo:'/items',pathMatch:'full'},
  { path:'items',component:HomeComponent},
  { path:'ladder',component:MembersComponent},
  { path:'community', component: CommunityComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
