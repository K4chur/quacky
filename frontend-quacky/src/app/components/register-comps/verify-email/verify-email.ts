import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  imports: [RouterLink],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {
  state: verificationState = verificationState.MISSING;
  countdown = 5;

  constructor(private router: Router, private cdf: ChangeDetectorRef) {}

  protected startRedirect() {
    const sub = interval(1000).subscribe(() => {
      this.countdown--;
      this.cdf.markForCheck()
      if (this.countdown <= 0) {
        sub.unsubscribe();
        this.router.navigate(['/login']);
      }
    });
  }

  protected goLogin() {
    this.router.navigate(['/login']);
  }
}

enum verificationState {
  LOADING = 'loading',
  OK = 'ok',
  EXPIRED = 'expired',
  INVALID = 'invalid',
  MISSING = 'missing',
}
