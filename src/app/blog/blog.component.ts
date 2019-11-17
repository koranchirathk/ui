import { Component, OnInit } from "@angular/core";
import { BlogService } from "../services/blog.service";
import { StorageService } from "../services/storage-service";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  public blogs: any = [];
  public comment: string;
  public userDetails: any = {};
  public blog: any = {};
  public isAddBlog: boolean = false;
  public showBlogDetail: boolean = false;
  public selectedBlog: any = {};
  constructor(
    private blogService: BlogService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.userDetails = this.storage.getUserDetails();
    // get admin group list
    this.getBlogList();
  }

  // Get the blogs
  getBlogList() {
    this.blogService
      .getAllBlogs(this.userDetails.access_token)
      .subscribe(response => {
        this.blogs = response;
        console.log(this.blogs);
      });
  }
  //Saving the comment
  updateBlog() {
    if (!this.selectedBlog.comments) {
      this.selectedBlog.comments = [];
    }
    let comment: any = {};
    comment.detail = this.comment;
    comment.userId = this.userDetails.username;
    comment.blogId = this.selectedBlog.blogId;
    this.blogService
      .updateComment(this.userDetails.access_token, comment)
      .subscribe(response => {
        this.comment = "";
        this.showSelectedBlog(this.selectedBlog.blogId);
      });
  }

  // Show add blog section
  addBlog() {
    this.blog = {};
    this.isAddBlog = true;
  }

  // Save new blog
  add() {
    this.isAddBlog = false;
    this.blog.blogAuthor = this.userDetails.username;
    this.blog.comments = [];
    console.log(this.blog);
    this.blogService
      .addBlog(this.userDetails.access_token, this.blog)
      .subscribe(response => {
        this.getBlogList();
      });
  }

  // SHow blog detail
  showSelectedBlog(id) {
    this.blogService
      .getBlogById(this.userDetails.access_token, id)
      .subscribe(response => {
        this.selectedBlog = response;
        console.log(this.selectedBlog);
        this.showBlogDetail = true;
      });
  }
}
