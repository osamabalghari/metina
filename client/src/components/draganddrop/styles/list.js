/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import QuoteItem from './item'
import {AiOutlinePlus} from 'react-icons/ai'
import Title from './title.tailwind'

const Style = {
	wrapper: 'flex flex-col border-8  border-[#EBECF0] pb-0 select-none  bg-[#EBECF0] ease-in inherit',
	dropzone: 'm-h-[250px] pb-8',
	scrollcontainer: 'overflow-x-hidden overflow-y-auto max-h-[250px]',
	sidelist: 'flex items-center justify-center p-4 gap-[0.5rem] pointer',
	plusdiv: 'border border-[#acacc0] rounded-full h-[1rem] w-[1rem] flex justify-center items-center'
}

const InnerQuoteList = React.memo(function InnerQuoteList(props) {
	return props.quotes.map((quote, index) => (
		<Draggable key={quote.id} draggableId={quote.id} index={index}>
			{(dragProvided, dragSnapshot) => <QuoteItem key={quote.id} quote={quote} isDragging={dragSnapshot.isDragging} isGroupedOver={Boolean(dragSnapshot.combineTargetFor)} provided={dragProvided} />}
		</Draggable>
	))
})

function InnerList(props) {
	const {quotes, dropProvided} = props
	const title = props.title ? <Title></Title> : null

	return (
		<div>
			{title}
			<div className={Style.dropzone} ref={dropProvided.innerRef}>
				<InnerQuoteList quotes={quotes} />
				{dropProvided.placeholder}
			</div>
		</div>
	)
}

export default function QuoteList(props) {
	const {ignoreContainerClipping, internalScroll, scrollContainerStyle, isDropDisabled, isCombineEnabled, listId = 'LIST', listType, style, quotes, title, useClone} = props

	return (
		<Droppable
			droppableId={listId}
			type={listType}
			ignoreContainerClipping={ignoreContainerClipping}
			isDropDisabled={isDropDisabled}
			isCombineEnabled={isCombineEnabled}
			renderClone={useClone ? (provided, snapshot, descriptor) => <QuoteItem quote={quotes[descriptor.source.index]} provided={provided} isDragging={snapshot.isDragging} isClone /> : null}>
			{(dropProvided, dropSnapshot) => (
				<div
					style={style}
					className={`${Style.wrapper} ${isDropDisabled ? 'opacity-50' : 'inherit'}`}
					isDraggingOver={dropSnapshot.isDraggingOver}
					isDropDisabled={isDropDisabled}
					isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
					{...dropProvided.droppableProps}>
					{internalScroll ? (
						<div style={scrollContainerStyle} className={Style.scrollcontainer}>
							<InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
							<div className={Style.sidelist}>
								<h1 className="text-[#acacc0]">Add task</h1>
								<div className={Style.plusdiv}>
									<AiOutlinePlus className="text-[#acacc0]" />
								</div>
							</div>
						</div>
					) : (
						<>
							<InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
							<div className={Style.sidelist}>
								<h1 className="text-[#acacc0]">Add task</h1>
								<div className={Style.plusdiv}>
									<AiOutlinePlus className="text-[#acacc0]" />
								</div>
							</div>
						</>
					)}
				</div>
			)}
		</Droppable>
	)
}
