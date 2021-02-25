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
  
  setNames = ['shaper','elder','uElder','maven','synth','uAtziri','xophs','tuls','uuls','eshs','chayulas'];
  the_hidden = true;
  the_feared = false;
  the_twisted = false;
  the_formed = false;
  activeSet = 'shaper';
  activeItemList:Item[] = [];
  constructor(private apiService:ApiService) { }

  async ngOnInit() {
    await this.changeTeam("Hidden");
  }

  async changeTeam(team){
    this.the_feared = false;
    this.the_hidden = false;
    this.the_twisted = false;
    this.the_formed = false;

    if (team === 'Hidden')
    {
      this.the_hidden = true;
      this.activeItemList = await this.apiService.getItems("/TheHidden");
    }
    if (team === 'Feared')
    {
      this.the_feared = true;
      this.activeItemList = await this.apiService.getItems("/TheFeared");
    }    
    if (team === 'Twisted')
    {
      this.the_twisted = true;
      this.activeItemList = await this.apiService.getItems("/TheTwisted");
    }
    if (team === 'Formed')
    {
      this.the_formed = true;
      this.activeItemList = await this.apiService.getItems("/TheFormed");
    }
  }

  changeSet(set){
    this.activeSet = set;
  }

}
