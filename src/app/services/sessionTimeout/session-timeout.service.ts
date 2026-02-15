import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {

  private timeout: number = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  private lastActivity: number = Date.now();

  private timeoutSubject: Subject<void> = new Subject<void>();

  constructor() {
    // this.initSessionTimeout();
  }

  public initSessionTimeout(): void {
    setInterval(() => {
      if (Date.now() - this.lastActivity > this.timeout) {
        this.timeoutSubject.next();
      }
    }, 50000);
  }

  public onTimeout(): Observable<void> {
    return this.timeoutSubject.asObservable();
  }

  public onUserActivity(): void {
    this.lastActivity = Date.now();
  }
}
