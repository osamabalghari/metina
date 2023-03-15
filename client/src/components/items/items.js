import React, {useState} from 'react'
//import './styles.css'
import Nestable from 'react-nestable'
import {AiOutlineDrag, AiFillCaretRight, AiFillCaretDown} from 'react-icons/ai'
import 'react-nestable/dist/styles/index.css'

const Styles = {
	style: 'relative bg-[#f9fafa] flex',
	cssCenter: 'flex items-center justify-center w-[2rem] h-[100%] pointer relative',
	drag: 'absolute width-[100%]'
}

const items = [
	{
		id: 0,
		text: 'Item 1',

		children: [
			{
				id: 4,
				text: 'Item 3',

				children: [
					{
						id: 12,
						text: 'Une ressource',
						amount: 1
					},
					{
						id: 13,
						text: "La main d'œuvre",
						amount: 1
					}
				]
			}
		]
	},

	{
		id: 3,
		text: 'Item 2',

		children: [
			{
				id: 1,
				text: 'Super Ouvrage',

				children: [
					{
						id: '2-1',
						text: 'Ressource 1',
						amount: 1
					},
					{
						id: '2-2',
						text: 'Ouvrage',

						children: [
							{id: 'toto', text: 'Ressource truc', amount: 1},
							{id: 'toto2', text: 'Ressource autre', amount: 1}
						]
					}
				]
			}
		]
	}
]

const renderItem = (props) => {
	const {item, index, collapseIcon, handler} = props

	return (
		<div className={Styles.style}>
			{handler}
			{collapseIcon}
			<div className="p-[1rem] flex-[1]">{item.text}</div>
		</div>
	)
}

export default function App() {
	const [collapseAll, setCollapseAll] = useState(false)
	const Handler = () => {
		return (
			<div className={Styles.cssCenter}>
				<div className={Styles.drag}></div>
			</div>
		)
	}
	const Collapser = ({isCollapsed}) => {
		return <div className={Styles.cssCenter}>{isCollapsed ? <AiFillCaretRight /> : <AiFillCaretDown />}</div>
	}
	return (
		<div className="Apps">
			<Nestable items={items} renderItem={renderItem} handler={<Handler />} renderCollapseIcon={({isCollapsed}) => <Collapser isCollapsed={isCollapsed} />} collapsed={collapseAll} onChange={(items) => console.log(items)} />
		</div>
	)
}
