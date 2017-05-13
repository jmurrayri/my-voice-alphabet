import React, {Component} from 'react';
import Letter from '../Letter';
import classNames from 'classnames';
import cases from '../common/constants/cases';
import modes from '../common/constants/modes';

import * as audioUtil from '../common/util/audioUtil';

const START_LETTER_CHAR_CODE = 65;
export default class extends Component {
    constructor(props) {
        super(props);

        const letters = [];
        for (let i = START_LETTER_CHAR_CODE; i <= (START_LETTER_CHAR_CODE + 25); i++) {
            let letter = String.fromCharCode(i);

            letters.push(letter);
        }

        this.state = {
            mode: modes.FREE,
            casing: cases.UPPER,
            selectedLetter: null,
            letters,
            unusedLetters: [...letters],
        };

        this.chooseRandomLetterToFind = this.chooseRandomLetterToFind.bind(this);
        this.replayLetter = this.replayLetter.bind(this);
        this.toggleCase = this.toggleCase.bind(this);
        this.selectLetter = this.selectLetter.bind(this);
        this.playFindTheLetter = this.playFindTheLetter.bind(this);
        this.quitFindTheLetter = this.quitFindTheLetter.bind(this);
    }

    toggleCase() {
        const { casing } = this.state;

        if (casing === cases.UPPER) {
            this.setState({
                casing: cases.LOWER
            });
        }
        else {
            this.setState({
                casing: cases.UPPER
            });
        }
    }

    async selectLetter(letter) {
        const {mode, selectedLetter} = this.state;

        if (mode === modes.FIND_THE_LETTER) {
            if (selectedLetter === letter) {
                await audioUtil.playAudio('ThatsRight');
                this.chooseRandomLetterToFind();
            }
            else {
                audioUtil.playAudio('TryAgain');
            }

        }
        else {
            audioUtil.playAudio(letter);
        }
    }

    replayLetter() {
        const {selectedLetter} = this.state;

        if (selectedLetter) {
            audioUtil.playAudio(selectedLetter);
        }
    }

    quitFindTheLetter() {
        this.setState({
            mode: modes.FREE,
            selectedLetter: null,
        });
    }

    async playFindTheLetter() {
        await audioUtil.playAudio('FindTheLetter');

        this.setState({
            mode: modes.TRANSITIONING,
        });

        this.chooseRandomLetterToFind();
    }

    chooseRandomLetterToFind() {
        const {unusedLetters, letters} = this.state;
        const selectedLetter = audioUtil.playRandom(unusedLetters);

        const index = unusedLetters.indexOf(selectedLetter);
        let newUnusedLetters = [...unusedLetters];
        if (newUnusedLetters.length === 1) {
            newUnusedLetters = [...letters];
        }
        else {
            newUnusedLetters.splice(index, 1);
        }

        this.setState({
            mode: modes.FIND_THE_LETTER,
            selectedLetter,
            unusedLetters: newUnusedLetters,
        });
    }

    render() {
        const {casing, letters, mode} = this.state;

        const casedLetters = letters.map((l)=> {
            if (casing === cases.UPPER) {
                return l.toUpperCase();
            }
            else {
                return l.toLowerCase();
            }
        });

        return (
            <div className={classNames('board', {'find-mode': mode === modes.FIND_THE_LETTER})}>
                {casedLetters.map((l) => {
                    return (
                        <Letter key={l} letter={l} handleClick={this.selectLetter} />
                    );
                })}
                <div className="buttons-left">
                    {mode === modes.FIND_THE_LETTER && <button className="quit-find-the-letter game-button" onClick={() => this.quitFindTheLetter()}>QUIT</button>}
                    {mode === modes.FIND_THE_LETTER && <button className="hear-again game-button" onClick={() => this.replayLetter()}>HEAR IT AGAIN</button>}
                        {mode === modes.FREE && <button className="find-the-letter game-button" onClick={() => this.playFindTheLetter()}>PLAY FIND THE LETTER</button>}
                </div>
                <div className="buttons-right">
                    <button className="change-case" onClick={() => this.toggleCase()}>CHANGE CASE</button>
                </div>
            </div>
        )
    }
}