import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  readonly getApi = 'https://the-trivia-api.com/api/questions';
  getDataQuiz = '';
  constructor(private http: HttpClient) {}

  getQuizAPI() {
    return this.http.get(this.getDataQuiz);
  }

  getCategory(category: string) {
    return (this.getDataQuiz = this.getApi + `?categories=${category}`);
  }
}
