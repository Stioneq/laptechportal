import {Tag} from './tag';
import {GetQuestionResponse, QuestionDTO, QuestionPreviewDTO} from '../../../../types/portal';
import {HasIcon} from './has-icon';

export interface Question extends GetQuestionResponse, HasIcon {
}
