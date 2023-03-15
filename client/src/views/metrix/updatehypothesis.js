import RangeSlider, {HypothesisCard} from 'components/card/projectcard'
import {Button, Card, Form, Grid} from 'components/lib'
import Spacer from 'components/spacer/spacer'
import {Fragment} from 'react'

export const UpdateHypothesis = () => {
	return (
		<Fragment>
			<h1 className="text-[1.125rem]  leading-[1.375rem]">Hypothezise</h1>
			<Spacer height="h-[1.125rem]" />
			<h1 className="text-[1.125rem]  leading-[1.375rem]"> A good hypothesis in business should be:</h1>
			<Spacer height="h-[1.125rem]" />
			<Grid cols="3">
				<HypothesisCard image="/Add/hypo_1.png" title="Testable" subtitle="Hypothesis can be proven true or false with evidence" />
				<HypothesisCard image="/Add/hypo_2.png" title="Precise" subtitle="Hypothesis can be proven true or false with evidence" />
				<HypothesisCard image="/Add/hypo_3.png" title="Discrete" subtitle="Hypothesis can be proven true or false with evidence" />
			</Grid>
			<div className="h-[0.125rem]"></div>
			<Card>
				<Grid cols="2">
					<Form
						inputs={{
							Discription: {
								label: ' Statement',
								type: 'text',
								placeholder: 'We blieve, that'
							}
						}}
					/>

					<Form
						inputs={{
							Discription: {
								label: 'Discription',
								type: 'textarea'
							}
						}}
					/>
					<h1 className="text-[1.125rem]  leading-[1.375rem]">Classify</h1>
					<Form
						inputs={{
							name: {
								label: 'CASE',
								type: 'select',
								options: [
									{value: 'syringe', label: 'syringe'},
									{value: 'mongo', label: 'MongoDB'},
									{value: 'pg', label: 'Postgres'},
									{value: 'sqlite3', label: 'Sqlite3'},
									{value: 'mssql', label: 'MSSQL'},
									{value: 'oracledb', label: 'Oracle DB'}
								]
							}
						}}
					/>

					<Form
						inputs={{
							name: {
								label: 'Business model',
								type: 'select',
								options: [
									{value: 'syringe', label: 'syringe'},
									{value: 'mongo', label: 'MongoDB'},
									{value: 'pg', label: 'Postgres'},
									{value: 'sqlite3', label: 'Sqlite3'},
									{value: 'mssql', label: 'MSSQL'},
									{value: 'oracledb', label: 'Oracle DB'}
								]
							}
						}}
					/>
				</Grid>
				<div className="h-[2rem]"></div>
				<h1 className="text-[1.125rem]  leading-[1.375rem]">Quantify</h1>
				<div className="h-[2rem]"></div>
				<div className="flex items-center  flex-wrap">
					<div>
						<h1 className="text-[0.875rem] leading-[1.125rem] font-normal uppercase text-light_black min-w-[8rem]">Risk</h1>
					</div>
					<div>
						<RangeSlider />
					</div>
				</div>

				<Spacer height="h-[1.125rem]" />
				<div className="flex items-center  flex-wrap">
					<div>
						<h1 className="text-[0.875rem] leading-[1.125rem] font-normal uppercase text-light_blac min-w-[8rem]">IMPORTANCE</h1>
					</div>
					<div>
						<RangeSlider />
					</div>
				</div>
				<Spacer height="h-[1.125rem]" />
				<div className="flex items-center   flex-wrap">
					<div>
						<h1 className="text-[0.875rem] leading-[1.125rem] font-normal uppercase text-light_black min-w-[8rem]">UNKNOWN</h1>
					</div>
					<div>
						<RangeSlider />
					</div>
				</div>
			</Card>
			<Spacer height="h-[1.125rem]" />
			<div className="flex justify-between">
				<div></div>
				<Button
					className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
					text="Update"
					color="blue"
					rounded
				/>
			</div>
			<Spacer height="h-[1.125rem]" />
		</Fragment>
	)
}
