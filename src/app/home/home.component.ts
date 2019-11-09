import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {  }

  // Redirect to discussion,message or blog section.
  redirect(section: string) {
    switch (section) {
      case 'discussion': this.router.navigate(['discussion']); break;
      case 'blog': this.router.navigate(['blog']); break;
      case 'message': this.router.navigate(['message']); break;
    }
  }
}
