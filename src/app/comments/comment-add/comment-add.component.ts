import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoaderComponent } from '../../shared/loader/loader.component';
import {CommentAdd} from '../../types/commentAdd';

@Component({
  selector: 'app-comment-add',
  standalone: true,
  imports: [FormsModule, LoaderComponent],
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent {
  @Output() newCommentAdded = new EventEmitter<void>();

  isLoading = false;

  constructor(
    // private commentsService: CommentsService,
    // private errorService: ErrorService,
    private route: ActivatedRoute
  ) {
  }

  addComment(form: NgForm) {
    if (form.invalid) return;

    // this.isLoading = true;

    const commentAdd: CommentAdd = form.value;
    console.log(commentAdd);
    // const offerId = this.route.snapshot.params['offerId'];
    //
    // this.commentsService.createComment(commentAdd, offerId).subscribe({
    //   next: () => {
    //     this.newCommentAdded.emit();
    //     form.resetForm();
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     this.errorService.navigateToErrorPage(err);
    //   }
    // });
  }
}
