import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from '../../model/comment';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() data: Comment;
  @Input() editable = true;
  @Output() onEdit: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  edit = false;
  commentControl;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.commentControl =
      this.fb.control(this.data.text, Validators.compose([Validators.required, Validators.minLength(10)]));
  }


  onCommentEdited() {
    this.edit = false;
    this.onEdit.emit(Object.assign({}, this.data, {text: this.commentControl.value}));
  }
}
