import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import * as MemberList from '../../assets/JSONs/BPL3Members.json'
import * as TheFeared from '../../assets/JSONs/TheFeared.json'
import * as TheTwisted from '../../assets/JSONs/TheTwisted.json'
import * as TheHidden from '../../assets/JSONs/TheHidden.json'
import * as TheFormed from '../../assets/JSONs/TheFormed.json'

export interface Team {
  name: string;
  points: number;
  leader:string;
}

const ELEMENT_DATA: Team[] = [
  {name: TheHidden.default.Name, points:TheHidden.default.TotalPoints,leader:TheHidden.default.Leader},
  {name: TheFeared.default.Name, points:TheFeared.default.TotalPoints,leader:TheFeared.default.Leader},
  {name: TheTwisted.default.Name, points:TheTwisted.default.TotalPoints,leader:TheTwisted.default.Leader},
  {name: TheFormed.default.Name, points:TheFormed.default.TotalPoints,leader:TheFormed.default.Leader}
];
import {Member} from "../models/Member";
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  dataSource2 = ELEMENT_DATA;
  displayedColumns: string[] = ['rank','account', 'team', 'charname', 'class','level','delve','points'];
  displayedColumns2: string[] = ['name', 'leader', 'points'];
  members:Member[] = MemberList.default;
  dataSource = new MatTableDataSource(this.members);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
