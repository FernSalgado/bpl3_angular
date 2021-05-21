import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import {environment } from "src/environments/environment";
import { twitchToken } from '../models/twitchToken';
import { streamers } from '../models/twitchData';


@Injectable({
  providedIn: 'root'
})
export class TwitchService {
  urlToken = 'https://id.twitch.tv/oauth2/token?client_id=gn08wrj9zi72skjpyugp3ns3jkg85v&client_secret=fbrr3j9sm6om8kmbhhia1w89visely&grant_type=client_credentials';
  urlStreams = 'https://api.twitch.tv/helix/streams?';
  constructor(private http:HttpClient) { }

  public getToken = async(): Promise<twitchToken> => {
    return this.http.post<twitchToken>(this.urlToken,null).toPromise()
    .then(result => {return result})
    .catch(error => {return error});
  }

  public getStreamers(users,token){
    const header = {
      'Authorization': 'Bearer ' + token,
      'Client-Id': 'gn08wrj9zi72skjpyugp3ns3jkg85v',
    }
    const requestOptions  = {                                                                                                                                                                                 
      headers: header, 
    };
    let u = '';
    let streamers = [];
    users.forEach((item)=>{
      u = u + 'user_login='+item.Url.replace("https://www.twitch.tv/","")+'&';
    })
    
    console.log(u)
    return this.http.get(this.urlStreams + u, requestOptions).toPromise().then((data:any)=>{
      return data.data;
    }).catch((e)=>{
      return e;
    })
  }
  public getBadger(token){
    const header = {
      'Authorization': 'Bearer ' + token,
      'Client-Id': 'gn08wrj9zi72skjpyugp3ns3jkg85v',
    }
    const requestOptions  = {                                                                                                                                                                                 
      headers: header, 
    };
    return this.http.get(this.urlStreams + 'user_login=ThisIsBadger', requestOptions).toPromise().then((data:any)=>{
      return data.data[0];
    }).catch((e)=>{
      return e;
    })
  }
}
