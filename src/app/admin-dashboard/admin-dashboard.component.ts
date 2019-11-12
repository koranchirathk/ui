import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {

  groupList: any = [];
  showModal: boolean = false;
  editGoupDetail: any = {};
  constructor() {}

  ngOnInit() {
    // get admin group list
    this.groupList = [
      { groupName: "Crazy Friends", groupType: "Personal" },
      { groupName: "HODs", groupType: "Private" },
      { groupName: "Physics Department", groupType: "Private" },
      { groupName: "Chemitry Department", groupType: "Private" },
      { groupName: "Mathematics Department", groupType: "Private" },
      { groupName: "Biology Department", groupType: "Private" }
    ];
  }

  //Click on edit group
  editGroup( index: number ) {
    this.editGoupDetail = this.groupList[index];
    this.showModal = true;
  }

  // Hide the edit modal
  hide() {
    this.showModal = false;
  }

  //on click on edit
  edit() {
    console.log(this.editGoupDetail);
    this.showModal = false;
  }

  // Delete
  delete(index: number) {
    // Should call
    //this.groupList.slice[index];
  }
}
