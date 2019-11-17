import { Component, OnInit } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { StorageService } from "../services/storage-service";
import { User } from "../model/user";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  groupList: any = [];
  showModal: boolean = false;
  showAddModal: boolean = false;
  editGoupDetail: any = {};
  public userDetails: any = {};
  public newMember: string;
  public newGroupDetail: any = {};
  constructor(
    private adminService: AdminService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.userDetails = this.storage.getUserDetails();
    // get admin group list
    this.getAllGroups();
  }

  // get admin group list
  getAllGroups() {
    this.adminService
      .getAllGroups(this.userDetails.access_token)
      .subscribe(response => {
        this.groupList = response;
        console.log(this.groupList);
      });
  }
  //Click on edit group
  editGroup(index: number) {
    this.editGoupDetail = this.groupList[index];
    this.showModal = true;
  }

  // Remove member
  removeMember(member: string) {
    this.editGoupDetail.members = this.editGoupDetail.members.filter(
      x => x !== member
    );
    this.adminService
      .updateTheGroup(this.userDetails.access_token, this.editGoupDetail)
      .subscribe(response => {
        this.editGoupDetail = response;
        console.log(this.groupList);
      });
  }

  // Adding member
  addMember() {
    this.editGoupDetail.members.push(this.newMember);
    this.adminService
      .updateTheGroup(this.userDetails.access_token, this.editGoupDetail)
      .subscribe(response => {
        this.editGoupDetail = response;
        this.newMember = "";
        console.log(this.groupList);
      });
  }

  // Hide the edit modal
  hide() {
    this.showModal = false;
    this.showAddModal = false;
  }

  // Show add modal
  showaddModal() {
    this.showAddModal = true;
    this.newGroupDetail.members = [];
  }

  //on click on edit
  edit() {
    this.showModal = false;
    this.adminService
      .updateTheGroup(this.userDetails.access_token, this.editGoupDetail)
      .subscribe(response => {
        this.getAllGroups();
      });
  }

  // Delete
  delete(groupName: string) {
    // Should call
    if (confirm("Are you sure to delete the group?")) {
      this.adminService
        .deleteGroup(this.userDetails.access_token, groupName)
        .subscribe(response => {
          this.getAllGroups();
        });
    }
  }

  // Add new group
  add() {
    this.adminService
      .addGroup(this.userDetails.access_token, this.newGroupDetail)
      .subscribe(response => {
        this.showAddModal = false;
        this.getAllGroups();
      });
  }

  // Add member to the newly created group
  addMemberToNewGrp() {
    this.newGroupDetail.members.push(this.newMember);
    this.newMember = "";
  }
}
