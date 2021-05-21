import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Team } from '../models/Team';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-stream-ladder',
  templateUrl: './stream-ladder.component.html',
  styleUrls: ['./stream-ladder.component.css']
})
export class StreamLadderComponent implements OnInit {
  constructor(private apiService:ApiService ) { }
  dataSource2 :MatTableDataSource<Team>;
  teams:Team[] = [];
  displayedColumns2: string[] = ['name', 'totalPoints'];
  
  async ngOnInit(){
    setInterval(this.loadTeams,20000);
    await this.loadTeams();
    this.dataSource2 = new MatTableDataSource(this.teams);
  }

  async loadTeams(){
    this.teams = await this.apiService.getTeams();
  }

  checkTeam(teamName){
    return "../../assets/"+ teamName+".png";
}

}
