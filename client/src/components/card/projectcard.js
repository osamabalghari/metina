import * as React from 'react'
import { Range, getTrackBackground } from 'react-range'
import { Loader, Card, useNavigate } from 'components/lib'

export function ProjectCard(props) {
	const navigate = useNavigate()
	return (
		<div className='cursor-pointer' onClick={() => navigate('/insight')}>
			<Card className="shadow-md flex items-center gap-[1.438rem] p-2 rounded-sm relative" >
				<div>
					<img className="w-[4.063rem] h-[4.063rem] bg-gray object-cover" alt='' src={process.env.REACT_APP_IMAGE_URL + props.image} />
				</div>
				<h1 className="text-[0.875rem]  leading-[1.063rem]">{props.title}</h1>
				{props.favrate ? <img className="absolute right-[0.5rem] bottom-[0.5rem]" src="/icons/star_fill.svg" alt="Star" /> : <img className="absolute right-[0.5rem] bottom-[0.5rem]" src="/icons/star_default.svg" alt="Star" />}

				{props.loading ? <Loader /> : props.children}
			</Card>
		</div>
	)
}
export function DashboardCard(props) {
	return (
		<div className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-md shadow-lg duration-300 hover:shadow-2xl group" >
			<div className="flex flex-row justify-between items-center">
				<div class="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
						<path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
					</svg>
				</div>
				<div class="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					12%
				</div>
			</div>
			<h1 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{props.title}</h1>
			<div class="flex flex-row justify-between group-hover:text-gray-200">
				<p>{props.subtitle}</p>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 group-hover:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
				{props.loading ? <Loader /> : props.children}
			</div>
		</div>
	)
	/*return (
		<div>
			{props.component === 'large' && (
				<Card className="flex items-center justify-center bg-gray min-h-[10.75rem] flex-col p-4 shadow-md">
					<h1 className="text-[3.125rem]  leading-[3.813rem] font-bold ">{props.title}</h1>
					<h1 className="text-[1.125rem]   leading-[1.375rem]">{props.subtitle}</h1>
					{props.loading ? <Loader /> : props.children}
				</Card>
			)}
			{props.component === 'medium' && (
				<Card className="flex items-center justify-center min-h-[3rem] bg-gray p-[0.54rem]">
					<h1 className="text-[3.125rem]  leading-[3.813rem] font-bold ">{props.title}</h1>
					{props.loading ? <Loader /> : props.children}
				</Card>
			)}
		</div>
	)*/
}

export function LogoCard(props) {
	return (
		<div className="flex items-center gap-[1.375rem] ">
			<img className="w-[4.938rem] h-[4.688rem] rounded-full" src="/logo_image.png" />
			<div>
				<h1 className="text-[1.125rem ]  leading-[1.375rem] font-bold ">{props.title}</h1>
				<h1 className="text-[1.125rem ]  leading-[1.375rem] font-normal ">{props.subtitle}</h1>
			</div>
		</div>
	)
}
export function HypothesisCard(props) {
	return (
		<Card className="shadow-md">
			<div className="flex items-center justify-center min-h-[8.188rem] gap-[1rem] p-4">
				<img src={props.image} className="h-[3.313rem] w-[3.313rem]" />
				<div className="flex  flex-col gap-[1rem]">
					<h1 className="text-[1.125rem]  leading-[1.375rem] font-bold ">{props.title}</h1>
					<h1 className="text-[0.75rem]   leading-[0.938rem]">{props.subtitle}</h1>
				</div>
				{props.loading ? <Loader /> : props.children}
			</div>
		</Card>
	)
}

const STEP = 0.1
const MIN = 0
const MAX = 100

class RangeSlider extends React.Component {
	state = {
		values: [50]
	}
	render() {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap'
					//margin: '2em'
				}}>
				<Range
					values={this.state.values}
					step={STEP}
					min={MIN}
					max={MAX}
					onChange={(values) => this.setState({ values })}
					renderTrack={({ props, children }) => (
						<div
							onMouseDown={props.onMouseDown}
							onTouchStart={props.onTouchStart}
							className="flex w-[17.5rem]"
							style={{
								...props.style
								//display: 'flex',
								//width: '20rem'
							}}>
							<div
								ref={props.ref}
								style={{
									height: '10px',
									width: '100%',
									borderRadius: '4px',
									background: getTrackBackground({
										values: this.state.values,
										colors: ['#4e8ed2', '#ccc'],
										min: MIN,
										max: MAX
									}),
									alignSelf: 'center'
								}}>
								{children}
							</div>
						</div>
					)}
					renderThumb={({ props, isDragged }) => <div className="h-[22px] w-[22px] rounded-full bg-white flex justify-center items-center shadow" {...props}></div>}
				/>
			</div>
		)
	}
}
export default RangeSlider

export function ExperimentCard(props) {
	return (
		<Card className="min-h-[13.125rem]  leading-[1.813rem] flex flex-col gap-[2rem]">
			<h1 className="text-[1.5rem]  leading-[1.813rem]">We believe that, Syringes are used in Clinical Trials and mainly RTF Syringe are used.</h1>
			<h1 className="max-w-[41rem]">Description asda sd asd Description asda sd asd Description asda sd asd Description asda sd asd Description asda sd asd Description asda sd asd Description asda sd asd Description asda sd asd </h1>
			<div className="flex gap-6 sm:gap-10 flex-wrap">
				<div className="flex gap-[0.2rem] items-center">
					<h1 className="text-[0.875rem] leading-[1.125rem] font-normal uppercase text-light_blac">Business Model: </h1>
					<h1 className="font-bold">Deirability</h1>
				</div>
				<div className="flex gap-[0.2rem] items-center">
					<h1>Risk:</h1>
					<h1 className="font-bold">20%</h1>
				</div>
				<div className="flex gap-[0.2rem] items-center">
					<h1>Importance: </h1>
					<h1 className="font-bold"> 30%</h1>
				</div>
				<div className="flex gap-[0.2rem] items-center">
					<h1> Unknown: </h1>
					<h1 className="font-bold">30%</h1>
				</div>
			</div>
		</Card>
	)
}
