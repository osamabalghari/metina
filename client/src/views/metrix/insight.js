import {ConfidenceSlider, ConfidenceSliderList} from 'components/confidencesilder/confidenceslider'
import Items from 'components/items/items'
import {Card, Form, Grid, SubNavbar} from 'components/lib'
import Spacer from 'components/spacer/spacer'
import {Fragment} from 'react'

export const Insight = () => {
	return (
		<Fragment>
			<SubNavbar />
			<Spacer height="h-[1.125rem]" />

			<Card>
				<Form
					inputs={{
						Discription: {
							label: ' Desirability',
							type: 'select',
							placeholder: 'We blieve, that',
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
			</Card>
			<Card>
				<Items />
			</Card>
			<Grid cols={4}>
				<ConfidenceSlider />
			</Grid>
			<Grid cols="2">
				<ConfidenceSliderList title="0" />
			</Grid>
		</Fragment>
	)
}
