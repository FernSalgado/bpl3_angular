import { Component, OnInit } from '@angular/core';
import { twitchToken } from '../models/twitchToken';
import { TwitchService } from '../service/twitch.service';
import * as Streamers from '../../assets/JSONs/BPL4_Streamers.json';
import * as Streamers2 from '../../assets/JSONs/BPL4_Streamers2.json';
import { streamers } from '../models/twitchData';
import { Streamer } from '../models/Streamer';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  streamers:Streamer[] = Streamers.default;
  streamers2:Streamer[] = Streamers2.default;
  constructor(private twitchService:TwitchService) { }
  token:twitchToken;
  streamersModel = [];
  badger = undefined;
  async ngOnInit() {
    this.token = await this.getToken();
    this.streamersModel = await this.getStreamers();
    this.badger = await this.getBadger();
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
      var response2 = await this.twitchService.getStreamers(this.streamers2,this.token.access_token);
      response.forEach(element => {
        var c = 1;
        var url = "https://www.twitch.tv/"+element.user_name;
        console.log(url.toLocaleLowerCase())
        var team = this.streamers.find(item => item.Url.toLocaleLowerCase() == url.toLocaleLowerCase());
        console.log(element);
        if (team) element.team = team.Team;
      });
      response2.forEach(element => {
        var c = 1;
        var url = "https://www.twitch.tv/"+element.user_name;
        console.log(url.toLocaleLowerCase())
        var team = this.streamers2.find(item => item.Url.toLocaleLowerCase() == url.toLocaleLowerCase());
        console.log(element);
        if (team) element.team = team.Team;
      });
      response = response.concat(response2);
    } catch (error) {
      console.log(error);
    }
    const sort = response.sort((a,b)=> (a.viewer_count < b.viewer_count) ? 1 : -1);
    return sort;
  };

  checkTeam(team){
    if (team != undefined) return "../../assets/"+team+".png";
  }

  getBadger = async() =>{
    try {
      var response = await this.twitchService.getBadger(this.token.access_token);
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
    return str;
  }

}
