import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './environment';
import { Topic } from './topic';

@Injectable()
export class MeetupService {
  baseUrl: string = 'https://api.meetup.com/';

  constructor(private jsonp: Jsonp) {}

  getTopicDetails(topicName: string): Observable<Topic> {
    return this.jsonp.get(this.baseUrl + 'topics?name=' + topicName + '&key=' + environment.meetupKey +
      '&format=json&offset=0&sign=true&photo-host=public&order=members&page=1' +
      '&sig_id=90953272&sig=be90771761c0e0fb85d14b9c39f3c5d772cfb721&callback=JSONP_CALLBACK')
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Response status: ' + res.status);
    }
    return res.json().results[0] || {};
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
