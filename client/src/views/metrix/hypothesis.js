import {Accordions} from 'components/accordion/accordion'
import {LogoCard} from 'components/card/projectcard'
import {Button, Card, Form, Grid, SubNavbar} from 'components/lib'
import Spacer from 'components/spacer/spacer'
import React, {Fragment} from 'react'

export const Hypothesis = () => {
	return (
		<Fragment>
			<LogoCard title="Smart Syringe" subtitle="Smart Syringe" />
			<Spacer height="h-[1.188rem]" />
			<SubNavbar active="hypotheses" />
			<Spacer height="h-[1.125rem]" />

			<Button
				className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
				medium
				text="Add Hypothesis"
				color="blue"
				rounded
			/>
			<Spacer height="h-[1.125rem]" />
			<Card>
				<Form
					inputs={{
						name: {
							label: 'Desirability',
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
			</Card>
			<Spacer height="h-[1.125rem]" />
			<div className="flex items-center justify-between ">
				<div>
					<h1 className="text-[1rem]  font-semibold leading-4">Hypothesis</h1>
				</div>
				<div className="flex items-center gap-[1rem]">
					<h1 className="text-[1rem]  font-semibold leading-4">Risk</h1>
					<h1 className="text-[1rem]  font-semibold leading-4">Open Risk</h1>
					<img src="/icons/arrow_down.svg" />
				</div>
			</div>
			<Spacer height="h-[1.125rem]" />
			<div className="flex flex-col gap-[0.5rem]">
				<Accordions />
				<Accordions />
				<Accordions />
			</div>
			<Spacer height="h-[1.125rem]" />
			<h1 className="text-[1.325rem]  font-normal leading-5">Feasability</h1>
			<Spacer height="h-[1.125rem]" />
			<div className="flex items-center justify-between ">
				<div>
					<h1 className="text-[1rem]  font-semibold leading-4">Hypothesis</h1>
				</div>
				<div className="flex items-center gap-[1rem]">
					<h1 className="text-[1rem]  font-semibold leading-4">Risk</h1>
					<h1 className="text-[1rem]  font-semibold leading-4">Open Risk</h1>
					<img src="/icons/arrow_down.svg" />
				</div>
			</div>
			<Spacer height="h-[1.125rem]" />
			<div className="flex flex-col gap-[0.5rem]">
				<Accordions />
				<Accordions />
				<Accordions />
			</div>
			<Spacer height="h-[1.125rem]" />
			<h1 className="text-[1.325rem]  font-normal leading-5">Viability</h1>
			<Spacer height="h-[1.125rem]" />
			<div className="flex items-center justify-between ">
				<div>
					<h1 className="text-[1rem]  font-semibold leading-4">Hypothesis</h1>
				</div>
				<div className="flex items-center gap-[1rem]">
					<h1 className="text-[1rem]  font-semibold leading-4">Risk</h1>
					<h1 className="text-[1rem]  font-semibold leading-4">Open Risk</h1>
					<img src="/icons/arrow_down.svg" />
				</div>
			</div>
			<Spacer height="h-[1.125rem]" />
			<div className="flex flex-col gap-[0.5rem]">
				<Accordions />
				<Accordions />
				<Accordions />
			</div>
			<Spacer height="h-[1.125rem]" />
			<h1 className="text-[1.325rem]  font-normal leading-5">Adaptability</h1>
			<Spacer height="h-[1.125rem]" />
			<div className="flex items-center justify-between ">
				<div>
					<h1 className="text-[1rem]  font-semibold leading-4">Hypothesis</h1>
				</div>
				<div className="flex items-center gap-[1rem]">
					<h1 className="text-[1rem]  font-semibold leading-4">Risk</h1>
					<h1 className="text-[1rem]  font-semibold leading-4">Open Risk</h1>
					<img src="/icons/arrow_down.svg" />
				</div>
			</div>
			<Spacer height="h-[1.125rem]" />
			<div className="flex flex-col gap-[0.5rem]">
				<Accordions />
			</div>
		</Fragment>
	)
}
