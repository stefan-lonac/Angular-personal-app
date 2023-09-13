import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  categorySelect: string = '';
  quizData: any;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.categorySelect;
  }

  setCategory() {
    return this.quizService.getCategory(this.categorySelect);
  }

  getQuiz() {
    this.quizService.getQuizAPI().subscribe((data) => {
      this.quizData = data;
      console.log(this.quizData);
    });
  }
}
