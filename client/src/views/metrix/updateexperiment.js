import {ExperimentCard} from 'components/card/projectcard'
import {Button, Card, Form, Grid, Header} from 'components/lib'
import Items from 'components/items/items'
import Spacer from 'components/spacer/spacer'
export const UpdateExperiment = () => {
	return (
		<>
			<h1 className="text-[1.125rem]  leading-[1.375rem]">Experiment</h1>
			<Spacer height="h-[1.125rem]" />
			<h1 className="text-[0.875rem] leading-[1.125rem] uppercase ">HYPOTHESIS</h1>
			<Spacer height="h-[1.125rem]" />
			<ExperimentCard />
			<Spacer height="h-[1.125rem]" />
			<Card>
				<Grid cols={2}>
					<Form
						inputs={{
							name: {
								label: 'Quarterly option         ',
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
								label: 'Name',
								type: 'text'
							}
						}}
					/>
					<Form
						inputs={{
							name: {
								label: 'Description',
								type: 'textarea'
							}
						}}
					/>
					<Form
						inputs={{
							name: {
								label: 'Cost',
								type: 'text'
							}
						}}
					/>
					<Grid cols="3">
						<Button
							className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
							medium
							text="FINSIHED   🏁"
							rounded
							outline
						/>

						<Button
							className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
							medium
							text="ONGOING   🚧"
							rounded
							outline
						/>

						<Button
							className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
							medium
							text="SCHEDULED  📅"
							rounded
							outline
						/>
					</Grid>
				</Grid>
				<Form
					inputs={{
						name: {
							label: 'ENDDATE',
							type: 'date'
						}
					}}
				/>
			</Card>
			<Spacer height="h-[1.125rem]" />
			<Card>
				<Items />
			</Card>
		</>
	)
}
