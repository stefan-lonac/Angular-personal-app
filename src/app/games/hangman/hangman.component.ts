import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss'],
})
export class HangmanComponent implements OnInit, OnChanges {
  clickedLetters: string[] = [];
  numberOfmisses: number = 6;
  success: boolean;
  letters: string = 'abcdefghijklmnopqrstuvwxyz';
  letter: string[];
  question: any;
  displayWord: string;
  words = [
    'array',
    'Rails',
    'AngularJS',
    'Bootstrap',
    'Ruby',
    'JavaScript',
    'authentication',
    'function',
    'object',
    'sublime',
    'github',
    'agile',
    'route',
    'database',
    'model',
    'view',
    'controller',
    'terminal',
    'array',
    'data',
    'inheritance',
    'Heroku',
    'scope',
    'closure',
  ];

  constructor() {}

  ngOnInit(): void {
    this.numberOfmisses;
    this.letter = this.letters.split('');
    this.randomWord;
    this.hiddenQuestion;

    console.log(this.question);
  }

  ngOnChanges(): void {}

  public chooseLetter(letter: string) {
    if (this.question.includes(letter)) {
      for (var i = 0; i < this.question.length; i++) {
        if (this.question[i] == letter.toLowerCase()) {
          this.displayWord =
            this.displayWord.slice(0, i) +
            letter.toLowerCase() +
            this.displayWord.slice(i + 1);
        }
      }
    } else {
      this.numberOfmisses--;
    }
    this.clickedLetters.push(letter);
    this.numOfMisses;
  }

  private get numOfMisses() {
    if (this.displayWord === this.question.join('') && this.success !== false) {
      return (this.success = true);
    } else if (this.numberOfmisses <= 0) {
      return (
        (this.numberOfmisses = 0),
        (this.success = false),
        (this.displayWord = this.question.join(''))
      );
    }
    return;
  }

  private get randomWord() {
    const index = Math.floor(Math.random() * this.words.length);
    return (this.question = this.words[index].toLowerCase().split(''));
  }

  private get hiddenQuestion() {
    let censure = '';
    for (let i = 0; i < this.question.length; i++) {
      censure += '_';
    }
    return (this.displayWord = censure);
  }

  // private get disableButtonsEndGame() {
  //   return this.success !== undefined
  //     ? (this.clickedLetters = this.letters.split(''))
  //     : this.success;
  // }
}
