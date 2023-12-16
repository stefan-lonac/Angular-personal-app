import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss'],
  standalone: true,
  imports: [CommonModule],
})

// TODO keyboard click, voice, qwerty alphabet and dvorak keyboard
export class HangmanComponent implements OnInit, OnChanges {
  clickedLetters: string[] = [];
  numberOfmisses: number = 6;
  gameStatus: boolean | undefined;
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

  public newGame(): void {
    this.randomWord;
    this.clickedLetters = [];
    this.numberOfmisses = 6;
    this.gameStatus = undefined;
    this.hiddenQuestion;
  }

  private get numOfMisses() {
    if (this.displayWord === this.question.join('')) {
      return (this.gameStatus = true), this.disableButtons;
    } else if (this.numberOfmisses <= 0) {
      return (
        (this.numberOfmisses = 0),
        (this.gameStatus = false),
        (this.displayWord = this.question.join('')),
        this.disableButtons
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

  private get disableButtons() {
    this.clickedLetters = this.letters.split('');
    return this.clickedLetters;
  }
}
