import { Component, EventEmitter, Input, Output } from '@angular/core';

import {CommentView} from '../../types/commentView';
import {ConfirmationModalComponent} from '../../shared/confirmation-modal/confirmation-modal.component';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {CommentsService} from '../comments.service';
import {ErrorService} from '../../error/error.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    LoaderComponent,
    ConfirmationModalComponent
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: CommentView;
  @Output() commentDeleted = new EventEmitter<number>();
  @Input() cocktailId!: string;

  isLoading: boolean = false;
  showConfirmModal: boolean = false;

  constructor(private commentsService: CommentsService,
              private errorService: ErrorService) {
  }

  deleteComment(commentId: number) {
    this.isLoading = true;
    this.commentsService.deleteComment(this.cocktailId, commentId).subscribe({
      next: () => {
        this.isLoading = false;
        this.commentDeleted.emit(commentId);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.navigateToErrorPage(err);
      }
    });
  }

  openDeleteModal() {
    this.showConfirmModal = true;
  }

  handleCancel() {
    this.showConfirmModal = false;
  }
}
