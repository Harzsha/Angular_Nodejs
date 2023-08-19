import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
// declare var anime: any;  
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {
textWrapper: any;
constructor(private spinner: NgxSpinnerService){
}

ngOnInit(): void {
  this.spinner.show();
  setTimeout(() => {
    /** spinner ends after 3 seconds */
    this.spinner.hide();
  }, 3000);
}
ngAfterViewInit(): void {
  this.textWrapper = document.querySelector('.an-2');
  this.textWrapper.innerHTML = this.textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.an-2 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el: any, i: number) => 150 * (i+1)
  }).add({
    targets: '.an-2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
}
}
