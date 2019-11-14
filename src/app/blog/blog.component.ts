import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { StorageService } from '../services/storage-service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public blogs: any = [];
  public comment: string;
  public userDetails: any = {};
  constructor(private blogService: BlogService, private storage: StorageService) {}

  ngOnInit() {
    this.userDetails = this.storage.getUserDetails();
    // get admin group list
    this.getBlogList();
  }

  // Get the blogs
  getBlogList() {
    this.blogService.getAllBlogs(this.userDetails.token).subscribe(response => {
      this.blogs = response;
    });
  }
  //Saving the comment
  saveComment(index: number) {
    console.log(this.blogs);
    this.blogs[index].comments.push(this.blogs[index].comment);
    this.blogService.updateTheBlog(this.userDetails.token, this.blogs[index]).subscribe(response => {
      this.getBlogList();
    });
  }

}
