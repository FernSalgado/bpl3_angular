import { Component, OnInit } from '@angular/core';
import { twitchToken } from '../models/twitchToken';
import { TwitchService } from '../service/twitch.service';
import * as Streamers from '../../assets/JSONs/Streamers.json'
import { streamers } from '../models/twitchData';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  streamers:string[] = Streamers.default;
  constructor(private twitchService:TwitchService) { }
  token:twitchToken;
  streamersModel = [];
  badger = undefined;
  async ngOnInit() {
    this.token = await this.getToken();
    this.streamersModel = await this.getStreamers();
    this.badger = await this.getBadger();
    console.log(this.badger)
  }
  getToken = async() =>{
    try {
      var response = await this.twitchService.getToken();
    } catch (error) {
      console.log(error);
    }
    return response;
  };

  getStreamers = async() =>{
    try {
      var response = await this.twitchService.getStreamers(this.streamers,this.token.access_token);
    } catch (error) {
      console.log(error);
    }
    return response;
  };

  getBadger = async() =>{
    try {
      var response = await this.twitchService.getBadger(this.token.access_token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    return response;
  };

  replaceUrl(url,w,h){
    var re1 = /{width}/;
    var re2 = /{height}/
    var str = url.replace(re1, w);
    str = str.replace(re2,h);
    console.log(str);
    return str;
  }

}
