import { Component, OnChanges, OnInit } from '@angular/core';
import { Word } from './hangman.model';

@Component({
  selector: 'hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss'],
})
export class HangmanComponent implements OnInit, OnChanges {
  counter = 0;
  clickedLetters: string[] = [];
  numberOfmisses: number = 6;
  success: boolean;
  letters: string = 'abcdefghijklmnopqrstuvwxyz';
  letter: string[];
  question: any;
  correctWord: Word[] = [];
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

  displayWord: string;
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
    this.clickedLetters.push(letter);
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
    this.numOfMisses;
    // if (this.question.includes(letter)) {
    //   const letterSplit = letter
    //     .split('')
    //     .filter((value: string, index: number, valueArray: any) => {
    //       return valueArray.indexOf(value) === index;
    //     })
    //     .join('');
    //   this.correctWord = [...this.correctWord, letterSplit];
    // } else {
    //   this.numberOfmisses--;
    // }
    // this.numOfMisses;
  }

  // TODO Podesiti da proverava da li je uneta recenica ista kao odgovor

  private get numOfMisses() {
    let lengthWord = this.correctWord.filter((y) => y).join('');
    console.log(this.question.length + ' ' + lengthWord);

    if (this.displayWord === this.question.join('')) {
      return (this.success = true);
    } else if (this.numberOfmisses <= 0) {
      console.log(':(');
      return (this.numberOfmisses = 0);
    } else {
      return (this.success = false);
    }
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
}
