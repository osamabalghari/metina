import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import QuoteList from '../styles/list'
import {RxDotsVertical} from 'react-icons/rx'
import Title from '../styles/title.tailwind'

const Style = {
	log: 'flex items-center justify-between border-t-4 border-[#f17faf] rounded bg-[#EBECF0]',
	progress: 'flex items-center justify-between border-t-4 border-[#fbcbab] rounded bg-[#EBECF0]',
	review: 'flex items-center justify-between border-t-4 border-[#82b0fb] rounded bg-[#EBECF0]',
	complete: 'flex items-center justify-between border-t-4 border-[#94e5d2] rounded bg-[#EBECF0]'
}
const Column = (props) => {
	const title = props.title
	const quotes = props.quotes
	const index = props.index
	return (
		<Draggable draggableId={title} index={index}>
			{(provided, snapshot) => (
				<div className="flex flex-col m-2 w-[22%] xs:w-[100%] sm:w-[100%] md:w-[47%] lg:w-[21.5%] xl:w-[23%] " ref={provided.innerRef} {...provided.draggableProps}>
					<div
						className={title === 'Back Log' ? Style.log : title === 'In Progress' ? Style.progress : title === 'Review' ? Style.review : title === 'Complete' ? Style.complete : ''}
						isDragging={snapshot.isDragging}
						title={title}
						style={{
							backgroundColor: snapshot.isDragging ? '#ABF5D1' : null
						}}>
						<div className={Title.title} isDragging={snapshot.isDragging} {...provided.dragHandleProps} aria-label={`${title} quote list`}>
							{title}
						</div>
						<RxDotsVertical />
					</div>
					<QuoteList
						listId={title}
						listType="QUOTE"
						style={{
							backgroundColor: snapshot.isDragging ? '#ABF5D1' : null
						}}
						quotes={quotes}
						internalScroll={props.isScrollable}
						isCombineEnabled={Boolean(props.isCombineEnabled)}
						useClone={Boolean(props.useClone)}
					/>
				</div>
			)}
		</Draggable>
	)
}

export default Column
