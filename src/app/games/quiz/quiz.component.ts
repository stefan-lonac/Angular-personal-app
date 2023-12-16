import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule],
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
