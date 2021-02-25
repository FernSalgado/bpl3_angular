import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Member} from "../models/Member";
import { ApiService } from '../service/api.service';
import { MatSort } from '@angular/material/sort';
import { Team } from '../models/Team';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  dataSource2 :MatTableDataSource<Team>;
  dataSource :MatTableDataSource<Member>; 
  displayedColumns: string[] = ['rank','account', 'team', 'charname', 'class','level','delve'];
  displayedColumns2: string[] = ['name', 'leader', 'totalPoints', 'setPoints','levelPoints','delvePoints'];
  members:Member[] = [];
  teams:Team[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private apiService:ApiService) { }
  ngAfterViewInit() {
  }
  async ngOnInit() {
    this.teams = await this.apiService.getTeams();
    console.log(this.teams)
    this.dataSource2 = new MatTableDataSource(this.teams);
    this.members = await this.apiService.getMembers();
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  checkTeam(teamName){
    if (teamName === 'The Hidden')
      return "../../assets/the_hidden.png";

    if (teamName === 'The Twisted')
      return "../../assets/the_twisted.png";

    if (teamName === 'The Feared')
      return "../../assets/the_feared.png";

    if (teamName === 'The Formed')
      return "../../assets/the_formed.png";
  }
}
