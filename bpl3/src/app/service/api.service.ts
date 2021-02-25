import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Member } from '../models/Member';
import { Team } from '../models/Team';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://bpl3-api.herokuapp.com';
  constructor(private http:HttpClient) { }

  public getMembers = async(): Promise<Member[]> => {
    return this.http.get<Member[]>(this.url + "/member").toPromise()
    .then(result => {return result})
    .catch(error => {return error});
  }

  public getTeams = async(): Promise<Team[]> => {
    return this.http.get<Team[]>(this.url + "/teams").toPromise()
    .then(result => {return result})
    .catch(error => {return error});
  }

  public getItems = async(team:string): Promise<Item[]> => {
    return this.http.get<Item[]>(this.url + team).toPromise()
    .then(result => {return result})
    .catch(error => {return error});
  }
}
