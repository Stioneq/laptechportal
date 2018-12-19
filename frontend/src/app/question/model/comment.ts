import {Tag} from './tag';
import {GetCommentResponse, GetQuestionResponse, QuestionDTO, QuestionPreviewDTO} from '../../../../types/portal';
import {HasIcon} from './has-icon';

export interface Comment extends GetCommentResponse, HasIcon {
}
