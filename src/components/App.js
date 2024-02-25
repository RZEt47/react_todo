import {Component} from "react";

import Header from './Header';
import Search from './Search';
import StatusBar from './statusBar';
import List from './List';
import Footer from './Footer';

class App extends Component {

	state= {
		todoData: [
			{ id: 0, title: 'Выпить кофе', important: false, done: false },
			{ id: 1, title: 'Сделать React приложение', important: false, done: false },
			{ id: 2, title: 'Позавтракать', important: false, done: false },
		],

		term: '',
		status: 'all'
	}




	// Первый вариант
	// onToggleImportant = (id) => {
	// 	this.setState((state) => {
	//
	// 		const index = state.todoData.findIndex((el)=>{
	// 			return el.id === id
	// 		})
	//
	// 		const oldItem = state.todoData[index]
	//
	// 		const newItem = {...oldItem, important: !oldItem.important}
	//
	// 		const part1 = state.todoData.slice(0, index)
	// 		const part2 = state.todoData.slice(index + 1)
	//
	// 		const newArray = [...part1, newItem, ...part2]
	//
	// 		return {
	// 			todoData: newArray
	// 		}
	// 	})
	// }

	// Второй вариант
	onToggleImportant = (id) => {
		this.setState((state) => {

			const newArray = state.todoData.map((task) => {
				return {
					...task, // деструктурировали вместо того, чтобы перечислять все свойства
					important: id === task.id ? !task.important : task.important
				}
			})

			return {
				todoData: newArray
			}
		})
	}




	// Первый вариант
	// onToggleDone = (id) => {
	// 	this.setState((state) => {
	//
	// 		const index = state.todoData.findIndex((el)=>{
	// 			return el.id === id
	// 		})
	//
	// 		const oldItem = state.todoData[index]
	//
	// 		const newItem = {...oldItem, important: false, done: !oldItem.done}
	//
	// 		const part1 = state.todoData.slice(0, index)
	// 		const part2 = state.todoData.slice(index + 1)
	//
	// 		const newArray = [...part1, newItem, ...part2]
	//
	// 		return {
	// 			todoData: newArray
	// 		}
	// 	})
	// }

	// Второй вариант
	onToggleDone = (id) => {
		this.setState((state) => {

			const newArray = state.todoData.map((task) => {
				return {
					...task, // деструктурировали вместо того, чтобы перечислять все свойства
					done: id === task.id ? !task.done : task.done
				}
			})

			return {
				todoData: newArray
			}
		})
	}




	// Первый вариант
	// deleteItem = (id) => {
	// 	this.setState((state) => {
	//
	// 		const index = state.todoData.findIndex((el)=>{
	// 			return el.id === id
	// 		})
	// 		const part1 = state.todoData.slice(0, index)
	// 		const part2 = state.todoData.slice(index + 1)
	// 		const newArray = [...part1, ...part2]
	//
	// 		return {
	// 			todoData: newArray
	// 		}
	// 	})
	// }

	// Второй вариант
	deleteItem = (id) => {
		this.setState((state) => {

			const newArray = state.todoData.filter((task) => {
				return task.id !== id
			})

			return {
				todoData: newArray
			}
		})
	}




	addItem = (title) => {

		this.setState((state) => {

			const ID = state.todoData[state.todoData.length - 1]['id'] + 1

			const newItem = {id: ID, title: title, important: false, done: false}

			const newArray = [...state.todoData, newItem]

			return {
				todoData: newArray
			}
		})
	}

	search = (items, term) => {

		if (term.trim().length === 0) {
			return items
		}

		return items.filter((item) => {
			if (item.title.toLowerCase().indexOf(term.toLowerCase().trim()) > -1) {
				return true
			}
		})

	}
	changeTerm = (term) => {

		this.setState({
			term: term
		})
	}

	filterByStatus = (items, status) => {
		switch(status) {
			case 'all':
				return items
			case 'active':
				return items.filter((item) => {
					return item.done === false
				})
			case 'done':
				return items.filter((item) => {
					return item.done === true
				})
			default: return items
		}
	}

	changeStatus = (status) => {
		this.setState({
			status: status
		})
	}
	render() {

		const filterBySearchStatus = this.search(this.state.todoData, this.state.term)

		const filterByStatusItems = this.filterByStatus(filterBySearchStatus, this.state.status)

		return (
			<div>
				<Header />
				<div className="search">
					<Search term = {this.state.term} changeTerm = {this.changeTerm} />
					<StatusBar status = {this.state.status} changeStatus = {this.changeStatus}/>
				</div>
				<List data = {filterByStatusItems} deleteItem = {this.deleteItem} onToggleDone = {this.onToggleDone} onToggleImportant = {this.onToggleImportant}/>
				<Footer addItem = {this.addItem} />
			</div>
		)
	}
}

export default App;
