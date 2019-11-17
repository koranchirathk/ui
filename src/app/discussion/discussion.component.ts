import { Component, OnInit } from "@angular/core";
import { DiscussionService } from "../services/discussion.service";
import { StorageService } from "../services/storage-service";

@Component({
  selector: "app-discussion",
  templateUrl: "./discussion.component.html",
  styleUrls: ["./discussion.component.css"]
})
export class DiscussionComponent implements OnInit {
  userDetails: any = {};
  discussions: any = {};
  discussion: any = {};
  discussionDTO: any = {};
  isAddDiscussion: boolean = false;
  showDiscussionDetail: boolean = false;
  comment: string;
  constructor(
    private discussionService: DiscussionService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.userDetails = this.storage.getUserDetails();
    // get discussions
    this.getDiscussionList();
  }

  getDiscussionList() {
    this.discussionService
      .getAllDiscussions(this.userDetails.access_token)
      .subscribe(response => {
        this.discussions = response;
        console.log(this.discussions);
      });
  }
  getDiscussionById(id) {
    this.discussionService
      .getDiscussionById(this.userDetails.access_token, id)
      .subscribe(response => {
        this.discussionDTO = response;
        console.log(this.discussionDTO);
        this.showDiscussionDetail = true;
      });
  }
  addDiscussion() {
    this.discussion.discussionAuthor = this.userDetails.username;
    this.discussionService
      .addDiscussion(this.userDetails.access_token, this.discussion)
      .subscribe(response => {
        this.discussion = {};
        this.isAddDiscussion = false;
        this.getDiscussionList();
      });
  }
  //
  showAddDiscussion() {
    this.isAddDiscussion = true;
  }

  updateDiscussion() {
    let discussionComment: any = {};
    discussionComment.commentDetail = this.comment;
    discussionComment.discussionId = this.discussionDTO.discussionId;
    discussionComment.userId = this.userDetails.username;
    this.discussionService
      .updateDiscussion(this.userDetails.access_token, discussionComment)
      .subscribe(response => {
        this.discussion = {};
        this.comment = "";
        this.showDiscussionDetail = false;
        this.getDiscussionList();
      });
  }
}
