import React from 'react'
import {MdOutlineAttachFile} from 'react-icons/md'
import {TfiComment} from 'react-icons/tfi'
import {AiOutlinePlus} from 'react-icons/ai'
import {Badge} from 'components/lib'

const Style = {
	clonebadge: 'bg-[#79f2c0] border border-2-[#57d9a3] rounded-full box-border text-[10px] bottom-[4px] right-[-0.834rem] top-[-0.834rem] h-[2.5rem] w-[2.5rem] flex justify-center items-center',
	container: 'rounded-[7px] bg-[white] box-border p-2 m-h-[2.5rem] mb-4 user-none text-[#091e42] flex',
	avatar: 'w-[2rem] h-[2rem] rounded-[100%] mr-[8px] shrink-0 grow-0 object-cover',
	content: 'grow basis-full flex flex-col',
	blockquote: 'mt-2 mb-4',
	sidelist: 'flex items-center gap-[0.5rem]',
	sublist: 'flex items-center justify-between',
	innerlist: 'flex items-center gap-[1rem]',
	plusdiv: 'border border-[#f5f5f7] rounded-full h-[2rem] w-[2rem] flex justify-center items-center'
}

function getStyle(provided, style) {
	if (!style) {
		return provided.draggableProps.style
	}

	return {
		...provided.draggableProps.style,
		...style
	}
}

function QuoteItem(props) {
	const {quote, isDragging, isGroupedOver, provided, style, isClone, index} = props
	return (
		<div
			className={Style.container}
			isDragging={isDragging}
			isGroupedOver={isGroupedOver}
			isClone={isClone}
			colors={quote.author.colors}
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			style={getStyle(provided, style)}
			data-is-dragging={isDragging}
			data-testid={quote.id}
			data-index={index}
			aria-label={`${quote.author.name} quote ${quote.content}`}>
			{isClone ? <div className={Style.clonebadge}>Clone</div> : null}
			<div quote={quote} className={Style.content}>
				<div>
					<Badge color={quote.author.buttonText === 'low priority' ? 'blue' : quote.author.buttonText === 'high priority' ? 'red' : quote.author.buttonText === 'med priority' ? 'green' : ''} text={quote.author.buttonText} />
				</div>
				<h1 className={Style.blockquote}>{quote.content}</h1>
				<div className={Style.sublist}>
					<div className={Style.innerlist}>
						<MdOutlineAttachFile />
						<TfiComment />
					</div>
					<div className={Style.sidelist}>
						<div className={Style.plusdiv}>
							<AiOutlinePlus />
						</div>
						<img src={quote.author.avatarUrl} className={Style.avatar} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(QuoteItem)
