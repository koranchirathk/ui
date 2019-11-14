import { Component, OnInit } from "@angular/core";
import { AdminService } from '../services/admin.service';
import { StorageService } from '../services/storage-service';

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
  constructor(private adminService: AdminService, private storage: StorageService) {}

  ngOnInit() {
    this.userDetails = this.storage.getUserDetails();
    // get admin group list
    this.getAllGroups();
  }

  // get admin group list
  getAllGroups() {
    this.adminService.getAllGroups(this.userDetails.token).subscribe(response => {
      this.groupList = response;
    });
  }
  //Click on edit group
  editGroup( index: number ) {
    this.editGoupDetail = this.groupList[index];
    this.showModal = true;
  }

  // Remove member
  removeMember(member: string) {
    this.editGoupDetail.member = this.editGoupDetail.member.filter(x => x !== member);
  }

  // Adding member
  addMember() {
    this.editGoupDetail.push(this.newMember);
  }

  // Hide the edit modal
  hide() {
    this.showModal = false;
    this.showAddModal = false;
  }

  // Show add modal
  showaddModal() {
    this.showAddModal = true;
    this.newGroupDetail.member = [];
  }

  //on click on edit
  edit() {
    this.showModal = false;
    this.adminService.updateTheGroup(this.userDetails.token, this.editGoupDetail).subscribe(response => {
      this.getAllGroups();
    });
  }

  // Delete
  delete(groupName: string) {
    // Should call
    this.adminService.deleteGroup(this.userDetails.token, groupName).subscribe(response => {
      this.getAllGroups();
    });
  }

  // Add new group
  add() {
    this.adminService.addGroup(this.userDetails.token, this.newGroupDetail).subscribe(response => {
      this.getAllGroups();
    });
  }
}
