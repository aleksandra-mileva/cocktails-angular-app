import { Component, Input, OnInit } from '@angular/core';
import { CommentAddComponent } from "../comment-add/comment-add.component";
import { CommentComponent } from "../comment/comment.component";
import { LoaderComponent } from "../../shared/loader/loader.component";
import {CommentViewModel} from '../../types/commentViewModel';
import {PaginationComponent} from '../../pagination/pagination.component';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [
    CommentAddComponent,
    CommentComponent,
    LoaderComponent,
    PaginationComponent
  ],
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']  // ✅ fixed
})
export class CommentsListComponent implements OnInit {
  @Input() cocktailId!: number;

  isLoadingComments: boolean = true;
  comments: CommentViewModel[] = [];
  page: number = 0;
  size: number = 2;
  totalPages: number = 0;

  constructor(
    // private commentsService: CommentsService,
    // private userService: UserService,
    // private errorService: ErrorService
  ) {
  }

  ngOnInit(): void {
    this.fetchComments(this.page);
  }

  fetchComments(page: number): void {
    this.isLoadingComments = false;

    this.comments = [
      {
        id: 1,
        text: 'Comment by User',
        created: '2025-07-31T18:42:02',
        author: 'User Userov',
        canDelete: true
      },
      {
        id: 1,
        text: 'Comment by Admin',
        created: '2025-08-01T18:42:02',
        author: 'Admin Adminov',
        canDelete: true
      }
    ]

    // this.isLoadingComments = true;
    // this.commentsService.getComments(this.offerId, page, this.size).subscribe({
    //   next: (response: Page<CommentView>) => {
    //     this.isLoadingComments = false;
    //     this.comments = response.content;
    //     this.totalPages = response.totalPages;
    //     this.page = response.number;
    //   },
    //   error: (err) => {
    //     this.isLoadingComments = false;
    //     this.errorService.navigateToErrorPage(err);
    //   }
    // });
  }

  loadComments(newPage: number): void {
    this.fetchComments(newPage);
  }

  get isLoggedIn(): boolean {
    // return this.userService.isLogged;
    return true;
  }
}
