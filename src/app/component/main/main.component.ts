import { NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [ NgFor],
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  readonly newPage = newPage;
}

const newPage = [5, 4, 3, 2, 1];

