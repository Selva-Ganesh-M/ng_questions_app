import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  name: string = '';
  questionList: any[] = [];
  currentQuestion: number = 0;
  score = 0;
  clock_tick = 60;
  interval$: any;

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

  nextQuestion() {
    if (this.currentQuestion < this.questionList.length - 1) {
      this.currentQuestion++;
      this.resetCounter();
    }
  }

  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.resetCounter();
    }
  }

  chooseAnswer(currentQuestion: any, option: any) {
    if (option.correct === true) {
      this.score += 10;
    }
    if (currentQuestion < this.questionList.length - 1) this.currentQuestion++;
    this.resetCounter();
  }

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
    this.clock_tick = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.clock_tick = 60;
    this.startCounter();
  }
}
