import React, {Fragment, useState} from 'react'
import {Accordion, AccordionBody} from '@material-tailwind/react'
import {Table} from 'components/lib'
function Icon({id, open}) {
	return <img src="/icons/arrow_down.svg" className={`${id === open ? 'rotate-[360deg]' : 'rotate-[270deg]'}  transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} />
}

export function Accordions() {
	const [open, setOpen] = useState(0)

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value)
	}
	const [users, setUsers] = useState([
		{Experiment: 'Landing Page', Cost: ' 3.000€', status: 'FINSIHED', Insight: <img src="/icons/green_icon.svg" className="w-[1.35rem]" />, Confidence: '80 %', Riskreduction: ' 14%'},
		{Experiment: 'Customer Interview', Cost: ' 3.000€', status: 'FINSIHED', Insight: <img src="/icons/red_icon.svg" className="w-[1.35rem]" />, Confidence: '80 %', Riskreduction: ' 14%'}
	])

	return (
		<Fragment>
			<div className="bg-white p-[1.5rem] hover:shadow-[5px_5px_5px_5px_rgba(0,0.3,0,0.3)] hover:ease-in duration-300 rounded-md">
				<Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
					<div onClick={() => handleOpen(1)} className="flex items-center gap-[2rem] place-content-between">
						<div className="flex gap-[0.5rem]">
							<Icon id={1} open={open} />
							<h1 className="text-[1rem]  font-normal leading-4">Syringes are used in Clinical Trials and mainly RTF Syringe are capable of performing</h1>
						</div>
						<div className="flex gap-[0.5rem]">
							<img src="/icons/pencil.svg" className=" w-[0.875] h-[1.125rem]" />
							<img src="/icons/basket.svg" className=" w-[0.875] h-[1.125rem]" />
						</div>
						<div className="flex items-center gap-[3rem]">
							<h1>20%</h1>
							<h1 className="text-[1rem]  font-semibold leading-4">4%</h1>
						</div>
					</div>
					<AccordionBody>
						<Table
							className="restrict-width"
							data={users}
							loading={users?.loading}
							badge={{
								col: 'status',
								color: 'blue',
								condition: [
									{value: 'FINSIHED', color: 'green'},
									{value: 'invited', color: 'blue'}
								]
							}}
						/>
						<h1 className="text-[1rem]  font-normal leading-4 p-4">🧪 New Experiment</h1>
					</AccordionBody>
				</Accordion>
			</div>
		</Fragment>
	)
}
