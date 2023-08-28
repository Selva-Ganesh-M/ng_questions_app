import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  // #region : variables
  name: string = '';
  questionList: any[] = [];
  currentQuestion: number = 0;
  score = 0;
  clock_tick = 60;
  interval$: any;
  progress: string = '0';
  // #endregion : variables

  @ViewChild('answer') answerKey!: ElementRef;
  constructor(private questionService: QuestionService) {
    console.log(`constructor`);
  }

  ngOnInit() {
    console.log(`onNg`);
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res) => {
      console.log(res);

      this.questionList = res.questions;
    });
  }

  // #region : question controls

  nextQuestion() {
    if (this.currentQuestion < this.questionList.length - 1) {
      this.currentQuestion++;
      this.resetCounter();
      this.updateProgress();
    }
  }

  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.resetCounter();
      this.updateProgress();
    }
  }

  chooseAnswer(currentQuestion: any, option: any) {
    if (option.correct === true) {
      this.score += 10;
    }
    if (currentQuestion < this.questionList.length - 1) {
      this.currentQuestion++;
    } else {
      this.stopCounter();
      return;
    }
    this.resetCounter();
    this.updateProgress();
  }

  resetQuiz() {
    this.score = 0;
    this.currentQuestion = 0;
    this.resetCounter();
    this.updateProgress();
  }

  updateProgress() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
  }

  // #endregion : question controls

  // #region : counter function

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.clock_tick--;
      if (this.clock_tick === 0) {
        this.currentQuestion++;
        this.clock_tick = 60;
        this.score -= 10;
      }
    });

    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 60000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
  }

  resetCounter() {
    this.stopCounter();
    this.clock_tick = 60;
    this.startCounter();
  }
  // #endregion : counter function
}
