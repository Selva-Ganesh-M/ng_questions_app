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
}
