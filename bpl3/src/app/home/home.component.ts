import { Component, OnInit } from '@angular/core';

import * as TheFearedItems from '../../assets/JSONs/TheFearedItems.json'
import * as TheTwistedItems from '../../assets/JSONs/TheTwistedItems.json'
import * as TheHiddenItems from '../../assets/JSONs/TheHiddenItems.json'
import * as TheFormedItems from '../../assets/JSONs/TheFormedItems.json'
import { Item } from '../models/Item';
import { ApiService } from '../service/api.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  setNames = ['Shaper','Elder','Uber Elder','Maven','Synthesis','Atziri','Xoph','Tul','Uul','Esh','Chayula','Heist','Pale Court','Farrul','Fenumus','Saqawal','Craiceann','Betrayal', 'Incursion','Abyss','Harvest','Metamorph','Blight','Izaro\'s Labyrinth','Labyrinth Jewel','Gems'];
  team1 = true;
  team2 = false;
  team3 = false;
  activeSet = 'Shaper Set';
  itemSet:Item[] = [];
  activeItemList:Item[] = [];
  constructor(private apiService:ApiService) { }

  async ngOnInit() {
    await this.changeTeam("Team1");
    this.itemSet = this.activeItemList.filter((item => item.SetName == "Shaper Set"))
    console.log(this.itemSet);
  }
  onChange(event){
    this.itemSet = [];
    console.log(event)
    this.itemSet = this.activeItemList.filter((item => item.SetName == event.value + " Set"))
    this.activeSet = this.itemSet[0].SetName;
    console.log(this.itemSet)
  }
  async changeTeam(team){
    this.team1 = false;
    this.team2 = false;
    this.team3 = false;

    if (team === 'Team1')
    {
      this.team1 = true;
      this.activeItemList = await this.apiService.getItems("/Team1");
    }
    if (team === 'Team2')
    {
      this.team2 = true;
      this.activeItemList = await this.apiService.getItems("/Team2");
    }    
    if (team === 'Team3')
    {
      this.team3 = true;
      this.activeItemList = await this.apiService.getItems("/Tema3");
    }
  }

  changeSet(set){
    this.activeSet = set;
  }

}
