// Core
import React, {	Component} from 'react';
import styled from 'styled-components';
import './App.css';

// Styles
const Title = styled.div`
	margin: 60px 0;
	font-size: 32px;
	text-align: center;
`;
const Grid = styled.div`
	margin: 0 auto;
	width: 300px;
`;
const Row = styled.div`
	display: flex;
`;
const Cell = styled.div`
	padding-top: 15px;
	width: 100px;
	height: 100px;
	font-size: 56px;
	text-align: center;
	border: 1px solid #cccccc;
	box-sizing: border-box;
`;
const Button = styled.button`
	margin-top: 30px;
	padding: 20px 30p;
	width: 300px;
	font-size: 20px;
	background: #ccc;
	border-radius: 6px;
`;
const Winner = styled.div`
	width: 300px;
	text-align: center;
`;

class App extends Component {
	constructor() {
		super();
		this.state = {
			squares: Array(9).fill(null),
			currentTurn: "X",
			winner: null
		};
	}

	makeMove = (props) => {
		const squares = this.state.squares.slice();
		
		if (squares[props] !== null) {
			return false;
		}

		squares[props] = this.state.currentTurn;

		this.setState({
			squares: squares,
			currentTurn: (this.state.currentTurn === "X" ? "O" : "X")
		}, () => this.checkWinner());
	}

	checkWinner = () => {
		const winningLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for(var i = 0; i < winningLines.length; i++) {
			var a, b, c;
			a = this.state.squares[winningLines[i][0]];
			b = this.state.squares[winningLines[i][1]];
			c = this.state.squares[winningLines[i][2]];
	  
			if(a === b && a === c && a !== null){
				this.setState({
					winner: a
				});
			}
		}
	}

	renderCells = (from, to) => {
		let cells = [];

		for (let i = from; i < to; i++) {
			cells.push(<Cell key={i} onClick={() => this.makeMove(i)}>{this.state.squares[i]}</Cell>)
		}

		return cells;
	}

	resetGame = () => {
		this.setState({
			squares: Array(9).fill(null),
			currentTurn: "X",
			winner: null
		});
	}

	render() {
		return ( 
			<Grid>
				<Title>Tic Tac Toe Game</Title>
				<Winner>
					{this.state.winner 
						? <div><b>{this.state.winner}</b> has won!</div>
						: '' }
				</Winner>
				<Row>
					{this.renderCells(0, 3)}
				</Row>
				<Row>
					{this.renderCells(3, 6)}
				</Row>
				<Row>
					{this.renderCells(6, 9)}
				</Row>
				<Button onClick={() => this.resetGame()}>Reset</Button>
			</Grid>
		);
	}
}

export default App;
