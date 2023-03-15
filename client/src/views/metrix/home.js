/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { ProjectCard, Button, Grid, ViewContext } from 'components/lib'
import Spacer from 'components/spacer/spacer'
import axios from 'axios'
import { DropdownMenu } from 'components/lib'

export function Home(props) {
	const [teams, setTeams] = useState([])
	const [users, setUsers] = useState([])
	const [dropDownOptions, setDropDownOptions] = useState([])
	const [multiSelect, setMultiSelect] = useState([])
	let user = JSON.parse(localStorage.getItem('user'))
	const [loading, setLoading] = useState(false)
	

	useEffect(() => {
		getTeams()
	}, [])

	useEffect(()=>{
		let options =[]
		let checkBox =[]
		if(users.length){
			users.map(res=>{
				options.push({label: res.name, value: res.id})
				checkBox.push({label:<div className='grid'><div className='flex items-center'><img className='h-6 w-6' src ={res?.photo ? process.env.REACT_APP_IMAGE_URL + res?.photo :'/userDefault.png'} alt='' /> <span>{res.name}</span> </div><span className='text-[0.875rem] text-slate-500'>{res.email}</span> </div>, value: res})
			})
		}
		setMultiSelect(checkBox)
		setDropDownOptions(options)
	},[users])

	const getTeams = async () => {
		const res = await axios({
			method: 'get',
			url: '/api/team',
		})

		if (res.data) {
			setTeams(res.data.data.team)
			setUsers(res.data.data.allUsers)
		}
	}

	const deleteTeam = async (id) => {
		try {
			setLoading(true)
			const res = await axios({
				method: 'Delete',
				url: `/api/delete-team/${id}`,
			})
			setLoading(false)
			if (res.data) {
				if (res.data.message) context.notification.show(res.data.message, 'success', true)
				context.modal.hide(true)
				getTeams()
			}
		} catch (error) {
			setLoading(false)
			context.handleError(error)
		}

	}

	const context = useContext(ViewContext)
	function projectModal(id, value) {
		context.modal.show(
			{
				title: value ? 'Edit Team' : 'Add Team',
				form: {
					name: {
						label: 'Name',
						type: 'text',
						value: value && value?.name,
						required: true
					},
					description: {
						label: 'Discription',
						type: 'text',
						value: value && value?.description,
						required: true
					},
					
					members: {
						// required: value ? false : true,
						label: 'Add Members',
						options: multiSelect,
						type: 'multiSelect',
						isMulti: true
					},
					user_id: {
						// required: true,
						label: 'Team Lead',
						type: 'select',
						options: dropDownOptions,
						default: value?.user_id?.id
					},
					logo: {
						required: value ? false : true,
						label: 'Image',
						type: 'file',
						
					},
				},
				images: value?.image,
				buttonText: 'Save',
				color: 'white',
				url: value ? `/api/team/${id}` : '/api/team',
				method: value ? 'PUT' : 'POST'
			},
			(form, res) => {
				getTeams()
			}
		)
	}
	function caseModal(teamId) {
		const scopes = [{ value: 'Most promising case ', label: 'Most promising case ' }]
		context.modal.show(
			{
				title: 'Add Product',
				// form: {
				// 	Name: {
				// 		label: 'Name',
				// 		type: 'text',
				// 		required: true
				// 	},
				// 	Discription: {
				// 		label: 'Discription',
				// 		type: 'text',
				// 		required: true
				// 	},
				// 	coststructure: {
				// 		label: 'cost structure',
				// 		type: 'text',
				// 		required: true
				// 	},
				// 	date: {
				// 		label: 'Date',
				// 		type: 'date',
				// 		required: true
				// 	},
				// 	Potential: {
				// 		label: 'Revenue Potential',
				// 		type: 'text',
				// 		required: true
				// 	},
				// 	ebitda: {
				// 		label: 'ebitda',
				// 		type: 'text',
				// 		required: true
				// 	},
				// 	NPV: {
				// 		label: 'expected NPV',
				// 		type: 'text',
				// 		required: true
				// 	},
				// 	Plannedcpex: {
				// 		label: 'planned capex',
				// 		type: 'text',
				// 		required: true
				// 	},
				// 	checkbox: {
				// 		type: 'checkbox',
				// 		options: scopes?.map((value) => {
				// 			return value.label
				// 		})
				// 	}
				// },
				form: {
					name: {
						label: 'Name',
						type: 'text',
						required: true
					},
					description: {
						label: 'Discription',
						type: 'text',
						required: true
					},
					// Color: {
					// 	label: 'Color',
					// 	type: 'text',
					// 	required: true
					// },
					logo: {
						required: true,
						label: 'Image',
						type: 'file'
					},
					// team_id: teamId
				},
				buttonText: 'Save',
				url: '/api/product',
				method: 'POST',
				team_id: teamId
			},
			(form, res) => {
				getTeams()
			}
		)
	}

	function deleteTeamModal(teamId) {
		context.modal.show(
			{
				title: 'Delete Team?',
				body: 'Are you really wants to do this. It deletes the product and the included hypotheses + experiments.',
				delete: true,
				buttonText: 'Delete?',
				cancel: 'Cancel',
				submit: () => deleteTeam(teamId),
				loading: loading
			}
		)
	}
	return (
		<Fragment>
			<div className="flex items-center justify-between">
				{/* <h1 className="text-[1.125rem]  leading-5">Starred project</h1> */}
				<div></div>
				{user?.permission === 'admin' && <Button
					className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
					text="+ &nbsp; Add Team"
					color="blue"
					action={projectModal}
					rounded
				/>}
			</div>
			{/* <Spacer height="h-2" />
			<Grid cols="4">
				<ProjectCard title="Projects 1" favrate={true} />
			</Grid> */}

			<Spacer height="h-2" />
			{teams.map(e => {
				return <>
					<div className="flex items-center gap-[4rem]">
						<h1 className="text-[1.125rem] items-center leading-5 w-[6em]">{e.name}</h1>
						{user?.permission === 'admin' && <div className='flex gap-[1rem]'>
							<DropdownMenu onEdit={() => projectModal(e.id, e)} onDelete={() => deleteTeamModal(e.id)} />
							<Button
								className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
								medium
								small
								text="+ &nbsp; Add Product"
								color="blue"
								action={() => caseModal(e.id)}
								rounded
							/>
						</div>}
					</div>
					<Spacer height="h-2" />
					<Grid cols="4">
						{e?.products?.length ? e?.products?.map(product => {
							return <ProjectCard title={product?.name} image={product?.logo}  />
						}) : <div className='opacity-80 text-[0.875rem]'>No Product yet</div>}</Grid>

				</>
			})}

			{/* <ConfirmationModal  /> */}
			{/* <Spacer height="h-2" />
			<div className="flex items-center gap-[4rem] ">
				<h1 className="text-[1.125rem]  leading-5">Team 2</h1>
				<Button
					className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
					text="+ &nbsp; Add Team"
					action={caseModal}
					color="blue"
					rounded
				/>
			</div>
			<Spacer height="h-2" />
			<Grid cols="4">
				<ProjectCard title="Projects A" favrate={true} />
				<ProjectCard title="Projects B" favrate={false} />
				<ProjectCard title="Projects C" favrate={false} />
			</Grid> */}
		</Fragment>
	)
}
