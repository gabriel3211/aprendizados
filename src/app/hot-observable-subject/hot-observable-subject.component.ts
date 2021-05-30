import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConnectableObservable, Observable, Observer, Subject } from 'rxjs';
import { publish } from 'rxjs/operators';

@Component({
  selector: 'app-hot-observable-subject',
  templateUrl: './hot-observable-subject.component.html',
  styleUrls: ['./hot-observable-subject.component.css']
})
export class HotObservableSubjectComponent implements OnInit, OnDestroy {

  hl1: number;
  hl2: number;
  subject = new Subject<number>();
  constructor() { }

  ngOnInit(): void {
    
    const producer = new Observable((observer: Observer<number>) => {
      let i = 0;
      const id = setInterval(() => {
       i++;
       i == 20 ? observer.complete() : observer.next(i);
      },1000);

      // return clearInterval(id);
    });
    producer.subscribe(this.subject);
    this.subjectHotObservable();
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }


  publishConnectable(): ConnectableObservable<number> {
    const multicast: ConnectableObservable<number> = this.subject
    .pipe(publish()) as ConnectableObservable<number>;
    multicast.connect();
    return multicast;
  }

  subjectHotObservable() {
    setTimeout(() => {
      this.publishConnectable.subscribe((value) => this.hl1 = value);
    }, 2000);

    setTimeout(() => {
      this.subject.subscribe((value) => this.hl2 = value);
    }, 10000)
  }
}
