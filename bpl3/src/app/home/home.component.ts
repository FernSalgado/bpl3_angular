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
  
  setNames = [
    'Abyss',
    'Atziri',
    'Betrayal', 
    'Blight',
    'Chayula',
    'Craiceann',
    'Elder',
    'Esh',
    'Farrul',
    'Fenumus',
    'Harvest',
    'Heist',
    'Incursion',
    'Izaro\'s Labyrinth',
    'Labyrinth Jewel',
    'Maven',
    'Metamorph',
    'Replica',
    'Saqawal',
    'Shaper',
    'Pale Court',
    'Synthesis',
    'Tul',
    'Uber Elder',
    'Uul-Netol',
    'Xoph'
  ];
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
  }

  setImage(name:string,setName:string){
    let re = /\s/g;
    if (setName == "Labyrinth Jewel") return "../../assets/"+setName+"/"+name.replace(re,"_") + "_inventory_icon.png"
    return "../../assets/"+setName.replace(" Set","/")+name.replace(re,"_") + "_inventory_icon.png"
  }
  onChange(event){
    this.itemSet = [];
    if (event.value == "Labyrinth Jewel") this.itemSet = this.activeItemList.filter((item => item.SetName == event.value))
    else this.itemSet = this.activeItemList.filter((item => item.SetName == event.value + " Set"))
    console.log(this.itemSet)
    this.activeSet = this.itemSet[0].SetName;
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
      this.activeItemList = await this.apiService.getItems("/Team3");
    }
  }

  changeSet(set){
    this.activeSet = set;
  }

}
