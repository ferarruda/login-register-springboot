import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule],
  template: `
    <button
      mat-flat-button
      color="primary"
      [type]="type"
      [disabled]="loading || disabled"
      class="lb">
      @if (loading) {
        <mat-progress-spinner mode="indeterminate" diameter="20" />
      } @else {
        <ng-content />
      }
    </button>
  `,
  styles: [`
    .lb {
      width: 100%;
      height: 48px;
      font-weight: 600;
      letter-spacing: .2px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `],
})
export class LoadingButtonComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() type: 'submit' | 'button' = 'submit';
}
