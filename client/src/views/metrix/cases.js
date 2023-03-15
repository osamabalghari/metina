import React, {Fragment, useContext, useState} from 'react'
import {Button, Card, Grid, SubNavbar} from 'components/lib'
import {LogoCard} from 'components/card/projectcard'
import Spacer from 'components/spacer/spacer'

export function Cases(props) {
	return (
		<Fragment>
			<LogoCard title="Smart Syringe" subtitle="Smart Syringe" />
			<Spacer height="h-[1.188rem]" />
			<SubNavbar active="case" />
			<Spacer height="h-[1.125rem]" />
			<Button
				className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
				small
				text="Add Case"
				color="blue"
				rounded
			/>
			<Spacer height="h-[1.125rem]" />
			<Card>
				<Grid cols="6">
					<Grid>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">Case</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">Description</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">cost structure</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">date: Date</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">Revenue Potential</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">Expected Return</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">ebitda</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">expected NPV</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">planned capex</h1>
					</Grid>
					<Grid>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">Hospital</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">Description</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">cost structure</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">date: Date</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">Revenue Potential</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">Expected Return</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">ebitda</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">expected NPV</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">planned capex</h1>
						<div>
							<Button
								className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
								text="Pick this one"
								small
								color="blue"
								rounded
							/>
						</div>
					</Grid>
					<Grid>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-bold">Spitex</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">Description</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">cost structure</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">date: Date</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">Revenue Potential</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">Expected Return</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">ebitda</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">expected NPV</h1>
						<h1 className="text-[1.25rem] text-black leading-[0.938rem] font-normal">planned capex</h1>
						<div>
							<Button
								className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
								small
								text="Pick this one"
								color="blue"
								rounded
							/>
						</div>
					</Grid>
				</Grid>
			</Card>
		</Fragment>
	)
}
