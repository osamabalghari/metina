import {Loader, ClassHelper} from 'components/lib'
import Style from './confidenceslider.tailwind.js'
import {MdOutlineDone} from 'react-icons/md'
import {BsQuestionLg} from 'react-icons/bs'
import {IoMdClose} from 'react-icons/io'
import {Fragment} from 'react'

export function ConfidenceSlider(props) {
	const cardStyle = ClassHelper(Style, {
		shadow: props.shadow,
		center: props.center,
		noPadding: props.noPadding,
		loading: props.loading,
		className: props.className,
		last: props.last,
		restrictWidth: props.restrictWidth
	})

	return (
		<section className="flex gap-[2rem] bg-white flex-wrap p-3">
			<div className="flex flex-col items-center gap-[1rem]">
				<div className="rounded-full h-[4rem] w-[4rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
					<MdOutlineDone className="text-[3rem] text-black" />
				</div>
				<h1>Support</h1>
			</div>
			<div className="flex flex-col items-center gap-[1rem]">
				<div className="rounded-full h-[4rem] w-[4rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
					<BsQuestionLg className="text-[2rem] text-black" />
				</div>
				<h1>Unclear</h1>
			</div>
			<div className="flex flex-col items-center gap-[1rem]">
				<div className="rounded-full h-[4rem] w-[4rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
					<IoMdClose className="text-[3rem] text-black" />
				</div>
				<h1>Refute</h1>
			</div>
			{props.loading ? <Loader /> : props.children}
		</section>
	)
}
export function ConfidenceSliderList(props) {
	const cardStyle = ClassHelper(Style, {
		shadow: props.shadow,
		center: props.center,
		noPadding: props.noPadding,
		loading: props.loading,
		className: props.className,
		last: props.last,
		restrictWidth: props.restrictWidth
	})

	return (
		<Fragment>
			<div className="flex flex-col bg-white p-3">
				<div className="flex gap-[0.8rem] flex-wrap">
					<div className="flex flex-col items-center gap-[1rem]">
						<div className="rounded-full h-[3rem] w-[3rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
							<h1 className="text-[1.5rem] font-bold text-black">0</h1>
						</div>
					</div>
					<div className="flex flex-col items-center gap-[1rem]">
						<div className="rounded-full h-[3rem] w-[3rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
							<h1 className="text-[1.5rem] font-bold text-black">0.1</h1>
						</div>
					</div>
					<div className="flex flex-col items-center gap-[1rem]">
						<div className="rounded-full h-[3rem] w-[3rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
							<h1 className="text-[1.5rem] font-bold text-black">0.2</h1>
						</div>
					</div>
					<div className="flex flex-col items-center gap-[1rem]">
						<div className="rounded-full h-[3rem] w-[3rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
							<h1 className="text-[1.5rem] font-bold text-black">0.3</h1>
						</div>
					</div>
					<div className="flex flex-col items-center gap-[1rem]">
						<div className="rounded-full h-[3rem] w-[3rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
							<h1 className="text-[1.5rem] font-bold text-black">0.4</h1>
						</div>
					</div>
					<div className="flex flex-col items-center gap-[1rem]">
						<div className="rounded-full h-[3rem] w-[3rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
							<h1 className="text-[1.5rem] font-bold text-black">0.5</h1>
						</div>
					</div>
					<div className="flex flex-col items-center gap-[1rem]">
						<div className="rounded-full h-[3rem] w-[3rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
							<h1 className="text-[1.5rem] font-bold text-black">0.6</h1>
						</div>
					</div>
					<div className="flex flex-col items-center gap-[1rem]">
						<div className="rounded-full h-[3rem] w-[3rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
							<h1 className="text-[1.5rem] font-bold text-black">0.7</h1>
						</div>
					</div>
					<div className="flex flex-col items-center gap-[1rem]">
						<div className="rounded-full h-[3rem] w-[3rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
							<h1 className="text-[1.5rem] font-bold text-black">0.8</h1>
						</div>
					</div>
					<div className="flex flex-col items-center gap-[1rem]">
						<div className="rounded-full h-[3rem] w-[3rem]  border-4 border-[#f9c713] flex items-center justify-center p-2">
							<h1 className="text-[1.5rem] font-bold text-black">0.9</h1>
						</div>
					</div>
				</div>
				<div className="flex justify-between p-4 ">
					<h1 className="text-[#c5b0a8]">Not Confident At All</h1>
					<h1 className="text-[#c5b0a8]">Very Confident</h1>
				</div>
			</div>

			{props.loading ? <Loader /> : props.children}
		</Fragment>
	)
}
