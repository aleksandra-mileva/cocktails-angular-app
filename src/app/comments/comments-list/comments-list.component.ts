import {Component, Input, OnInit} from '@angular/core';
import {CommentAddComponent} from "../comment-add/comment-add.component";
import {CommentComponent} from "../comment/comment.component";
import {LoaderComponent} from "../../shared/loader/loader.component";
import {CommentView} from '../../types/commentView';
import {PaginationComponent} from '../../pagination/pagination.component';
import {CommentsService} from '../comments.service';
import {UserService} from '../../user/user.service';
import {ErrorService} from '../../error/error.service';
import {PagedModel} from '../../types/pagedModel';

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
  @Input() cocktailId!: string;

  isLoadingComments: boolean = true;
  comments: CommentView[] = [];
  page: number = 0;
  size: number = 2;
  totalPages: number = 0;

  constructor(
    private commentsService: CommentsService,
    private userService: UserService,
    private errorService: ErrorService
  ) {
  }

  ngOnInit(): void {
    this.fetchComments(this.page);
  }

  fetchComments(page: number): void {
    this.isLoadingComments = false;

    this.isLoadingComments = true;
    this.commentsService.getComments(this.cocktailId, page, this.size).subscribe({
      next: (response: PagedModel<CommentView>) => {
        this.isLoadingComments = false;
        this.comments = response.content;
        this.totalPages = response.page.totalPages;
        this.page = response.page.number;
      },
      error: (err) => {
        this.isLoadingComments = false;
        this.errorService.navigateToErrorPage(err);
      }
    });
  }

  loadComments(newPage: number): void {
    this.fetchComments(newPage);
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
}
