import Question, { IQuestionTime } from "../models/Question.model";
import helper from "./helper.util";
import { IQuestionHelper } from "./interfaces.util";
import { RubricType, SemanticType } from "./types.util";

const shortenRubric = (question: Question, type: RubricType): string => {

    let result: string = '';
    let resources: Array<any> = []

    if (type === 'level') {
        resources = question.levels ? question.levels : [];
    } else if (type === 'difficulty') {
        resources = question.difficulties ? question.difficulties : [];
    } else if (type === 'question-type') {
        resources = question.types ? question.types : [];
    }

    if (resources.length === 1) {
        result = helper.capitalize(resources[0])
    } else if (resources.length > 1) {
        result = `${helper.capitalize(resources[0])} +${resources.length - 1}`
    } else {
        result = '---'
    }

    return result;

}

const rubricBadge = (type: RubricType) => {

    let result: SemanticType = 'info';

    if (type === 'level') {
        result = 'info'
    } else if (type === 'difficulty') {
        result = 'warning'
    } else if (type === 'question-type') {
        result = 'ongoing'
    } else if (type === 'score') {
        result = 'normal'
    } else if (type === 'time') {
        result = 'success'
    }

    return result

}

const formatTime = (time: IQuestionTime) => {
    
    let result = '1 Minute';

    if(time && time.duration && time.handle){

        result = `${time.duration} ${time.handle}`

        if(time.duration > 1){
            result = `${result}s`
        }

    }

    return result

}

const splitGenTime = (value: string): { value: string, handle: string } => {

    let result: { value: string, handle: string } = { value: '', handle: '' };

    const split = value.split(' ');

    if(split.length === 2){

        result.value = split[0];

        if(split[1].includes('s')){
            result.handle = split[1].substring(0, split[1].length - 1)
        } else {
            result.handle = split[1];
        }

    } else if(split.length > 2 && split.length === 4) {

        result.value = split[0];

        if(split[1].includes('s')){
            result.handle = split[1].substring(0, split[1].length - 1)
        } else {
            result.handle = split[1];
        }

    } else {
        result.value = '1';
        result.handle = 'minute'
    }

    return result;

}

const QHelper: IQuestionHelper = {
    shortenRubric: shortenRubric,
    rubricBadge: rubricBadge,
    formatTime: formatTime,
    splitGenTime: splitGenTime,
}

export default QHelper;