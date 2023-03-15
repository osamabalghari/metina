import React, {Fragment, useState} from 'react'
import {Grid, SubNavbar, Form, Card, Chart, HomeNav} from 'components/lib'
import {DashboardCard, LogoCard} from 'components/card/projectcard'
import Spacer from 'components/spacer/spacer'

export function SingleProject(props) {
	let data = {
		labels: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q1 2022', 'Q2 2022', 'Q3 2022', 'Q1 2022', 'Q2 2022', 'Q3 2022'],
		datasets: [
			{
				label: 'Planned',
				backgroundColor: '',
				data: [
					9000, 5000, 5240, 3520, 2510, 3652, 4555, 7850, 8850, 4000, 5000, 4520, 4457, 9200, 8750, 9500, 10000, 11010, 11432, 9850, 9000, 5000, 5240, 3520, 2510, 3652, 4555, 7850, 8850, 4000, 5000, 4520, 4457, 9200, 8750, 9500, 10000,
					11010, 11432, 9850
				]
			},
			{
				label: 'Reality',
				backgroundColor: 'red',
				data: [
					13000, 4000, 6000, 3500, 3600, 8060, 9120, 8900, 9300, 10010, 9500, 6300, 7200, 3600, 4600, 5300, 5500, 6900, 5800, 4900, 3000, 4000, 6000, 3500, 3600, 8060, 9120, 8900, 9300, 10010, 9500, 6300, 7200, 3600, 4600, 5300, 5500, 6900,
					5800, 4900
				]
			}
		]
	}

	return (
		<Fragment>
			<LogoCard title="Smart Syringe" subtitle="Smart Syringe" />
			<Spacer height="h-[1.188rem]" />
			<SubNavbar active="experiments" />
			<Spacer height="h-[1.125rem]" />
			<Card>
				<Grid cols="2">
					<Form
						inputs={{
							name: {
								label: 'Quarterly option',
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
								label: 'General + Spitex (Most promising)',
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
			</Card>

			<Card>
				<Chart data={data} type="bar" />
			</Card>
			<Grid cols={3}>
				<DashboardCard title="65%" subtitle="Hello World" component="large" />
				<DashboardCard title="1 B" subtitle="Overall expected return" component="large" />
				<DashboardCard title="350 M" subtitle="Overall expected return" component="large" />
				<DashboardCard title="65%" subtitle="Hello World" component="large" />
				<DashboardCard title="1 B" subtitle="Overall expected return" component="large" />
				<DashboardCard title="350 M" subtitle="Overall expected return" component="large" />
				<DashboardCard title="65%" subtitle="Hello World" component="large" />
				<DashboardCard title="65%" subtitle="Hello World" component="medium" />
				<DashboardCard title="65%" subtitle="Hello Worldsssssss" component="medium" />
				<DashboardCard
					title="Project 1"
					subtitle="Most promising project
(360 Millions)"
					component="large"
				/>
				<DashboardCard title="123" subtitle="Open Hypotheses" component="large" />
				<DashboardCard title="123" subtitle="Open Hypotheses" component="large" />
				<div>
					<Grid cols={2}>
						<DashboardCard title="5" component="medium" />
						<DashboardCard title="98" component="medium" />
					</Grid>
				</div>
				<div>
					<Grid cols={2}>
						<DashboardCard title="5" component="medium" />
						<DashboardCard title="98" component="medium" />
					</Grid>
				</div>
				<DashboardCard title="123" subtitle="Open Hypotheses" component="large" />
				<DashboardCard title="123" subtitle="Open Hypotheses" component="large" />
				<DashboardCard title="123" subtitle="Open Hypotheses" component="large" />
				<DashboardCard title="123" subtitle="Open Hypotheses" component="large" />
			</Grid>
		</Fragment>
	)
}
