import Board from 'components/draganddrop/board/Board'
import {Button, SubNavbar} from 'components/lib'
import {Fragment} from 'react'
import {generateQuoteMap} from 'components/draganddrop/mockData'
import {LogoCard} from 'components/card/projectcard'
import Spacer from 'components/spacer/spacer'
export function DragAndDrop() {
	const data = {
		medium: generateQuoteMap(20),
		large: generateQuoteMap(50)
	}
	return (
		<Fragment>
			<div className="flex justify-between items-center flex-wrap ">
				<LogoCard title="Smart Syringe" subtitle="Smart Syringe" />
				<div>
					<Button
						className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
						text="Add Hypothesis"
						color="blue"
						medium
						rounded
					/>
				</div>
			</div>
			<Spacer height="h-[1.125rem]" />
			<SubNavbar active="learnings" />
			<Spacer height="h-[1.125rem]" />
			<Board initial={data.medium} withScrollableColumns />
		</Fragment>
	)
}
