import { DashboardCard } from 'components/card/projectcard'
import { Card, Chart, Grid, Row } from 'components/lib'
import Spacer from 'components/spacer/spacer'
import React, { Fragment } from 'react'

export function AllProjects(props) {
	let data = {
		labels: ['30/12/2019', '29/12/2019', '28/12/2019', '27/12/2019', '30/12/2019', '29/12/2019', '28/12/2019', '27/12/2019', '30/12/2019', '29/12/2019', '28/12/2019', '27/12/2019'],
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
				backgroundColor: 'blue',
				data: [
					13000, 4000, 6000, 3500, 3600, 8060, 9120, 8900, 9300, 10010, 9500, 6300, 7200, 3600, 4600, 5300, 5500, 6900, 5800, 4900, 3000, 4000, 6000, 3500, 3600, 8060, 9120, 8900, 9300, 10010, 9500, 6300, 7200, 3600, 4600, 5300, 5500, 6900,
					5800, 4900
				]
			}
		]
	}
	return (
		<Fragment>
			<Card>
				<Chart className="shadow-md" type="line" data={data} />
			</Card>
			<Spacer height="h-2" />
			{/* <div>
				<div className=" ">
					<h1 className="text-[1.125rem] text-black leading-[1.361rem] font-normal">Team 1</h1>
				</div>
				<div className="h-2"></div>

				<div className="border-l-[0.188rem] h-80 relative">
					<h1 className="text-[1.125rem] text-black leading-[1.361rem] font-normal  absolute left-[-1rem] top-0">+</h1>
					<h1 className="text-[1.125rem] text-black leading-[1.361rem] font-normal rotate-[-89.88deg] absolute left-[-4.5rem] bottom-[10rem]">expected return</h1>
					<h1 className="text-[1.125rem] text-black leading-[1.361rem] font-normal  rotate-[-89.88deg] absolute left-[-1rem] bottom-0">-</h1>
				</div>

				<div className="border-b-[0.188rem]"></div>
				<div className="flex  items-center justify-between">
					<h1 className="text-[1.125rem] text-black leading-[1.361rem] font-normal mt-1  ">+</h1>
					<h1 className="text-[1.125rem] text-black leading-[1.361rem] font-normal rotate-[0.11deg]  ">Innovation Risk</h1>
					<h1 className="text-[1.125rem] text-black leading-[1.361rem] font-normal mr-3 mt-1 ">-</h1>
				</div>
			</div> */}
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
