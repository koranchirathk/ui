import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { DiscussionComponent } from "./discussion/discussion.component";
import { BlogComponent } from "./blog/blog.component";
import { MessageComponent } from "./message/message.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "discussion", component: DiscussionComponent },
  { path: "adminDashboard", component: AdminDashboardComponent },
  { path: "blog", component: BlogComponent },
  { path: "message", component: MessageComponent },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
