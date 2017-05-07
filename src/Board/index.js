import React, {Component} from 'react';
import Letter from '../Letter';
import classNames from 'classnames';
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
            mode: 'NORMAL',
            casing: 'UPPER',
            selectedLetter: null,
            letters
        };

        this.toggleCase = this.toggleCase.bind(this);
        this.selectLetter = this.selectLetter.bind(this);
        this.playFindTheLetter = this.playFindTheLetter.bind(this);
        this.quitFindTheLetter = this.quitFindTheLetter.bind(this);
    }

    toggleCase() {
        const { casing } = this.state;

        if (casing === 'UPPER') {
            this.setState({
                casing: 'LOWER'
            });
        }
        else {
            this.setState({
                casing: 'UPPER'
            });
        }
    }

    selectLetter(letter) {
        const {mode, selectedLetter} = this.state;

        if (mode === 'FIND') {
            if (selectedLetter === letter) {
                audioUtil.playAudio('ThatsRight');
                this.setState({
                    mode: 'NORMAL',
                    selectedLetter: null,
                });
            }
            else {
                audioUtil.playAudio('TryAgain');
            }

        }
        else {
            audioUtil.playAudio(letter);
        }
    }

    quitFindTheLetter() {
        this.setState({
            mode: 'NORMAL',
            selectedLetter: null,
        });
    }

    playFindTheLetter() {
        const {letters} = this.state;

        audioUtil.playAudio('FindTheLetter');

        this.setState({
            mode: 'FIND',
        });

        setTimeout(()=> {
            const selectedLetter = audioUtil.playRandom(letters);

            this.setState({
                selectedLetter
            });
        }, 3500);
    }

    render() {
        const {casing, letters, mode} = this.state;

        const casedLetters = letters.map((l)=> {
            if (casing === 'UPPER') {
                return l.toUpperCase();
            }
            else {
                return l.toLowerCase();
            }
        });

        return (
            <div className={classNames('board', {'find-mode': mode === 'FIND'})}>
                {casedLetters.map((l) => {
                    return (
                        <Letter key={l} letter={l} handleClick={this.selectLetter} />
                    );
                })}
                {mode === 'FIND' && <button className="quit-find-the-letter find-game" onClick={() => this.quitFindTheLetter()}>QUIT</button>}
                {mode !== 'FIND' && <button className="find-the-letter find-game" onClick={() => this.playFindTheLetter()}>PLAY FIND THE LETTER</button>}
                <button className="change-case" onClick={() => this.toggleCase()}>CHANGE CASE</button>
            </div>
        )
    }
}