import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public questionList: any[] = [];
  currentQuestion: number = 0;

  constructor(private questionService: QuestionService) {
    console.log(`constructor`);
  }

  ngOnInit() {
    console.log(`onNg`);
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
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
    }
  }

  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }
}
