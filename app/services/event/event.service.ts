import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private dataObserved = new BehaviorSubject<any>('');
  currentEvent = this.dataObserved.asObservable();
  // constructo() { }

  publishData(param: any): void {
    this.dataObserved.next(param);
  }


  private channels: { [key: string]: Subject<any>; } = {}


  constructor() { }


  subscribe(topic: string, observer: (_: any) => void): Subscription {

    if (!this.channels[topic]) {
      this.channels[topic] = new Subject<any>();
    }
    return this.channels[topic].subscribe(observer);
  }

  publish(topic: string, data: any[]): void {
    const subject = this.channels[topic];
    if (!subject) {
      return;
    } else {
      subject.next(data);
    }

  }

  destroy(topic: string): null {
    const subject = this.channels[topic];
    if (!subject) {
      return;

    } else {
      subject.complete();
      delete this.channels[topic];
    }
  }


}
