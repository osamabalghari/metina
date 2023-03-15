import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export function SubNavbar({active}) {
	const [selectedItem, setSelectedItem] = useState(active)
	const navigate = useNavigate()
	return (
		<>
			<section
				className="bg-white flex flex-wrap p-4 gap-[2.5rem]
		">
				<nav
					className="flex items-center  gap-[0.5rem] cursor-pointer relative"
					onClick={() => {
						navigate('/')
					}}>
					<img src={active === 'dashboard' ? '/icons/dashboard.svg' : '/icons/dashboard_inactive.svg'} className="h-[1rem] w-[1rem]" />
					<p className={active === 'dashboard' ? 'text-text_color text-[1rem] leading[1.25rem]' : 'text-text_color_unactive text-[1rem] leading[1.25rem]'}>Dashboard</p>
					<div className={active === 'dashboard' ? 'border-t-2 shadow-[0px -3px 0px 0px ] w-[100%] border-[#DF4949] absolute bottom-[-1.125rem] z-50 left-0 bottom-[-1.125rem]]' : ''}></div>
				</nav>

				<nav
					className="flex items-center gap-[0.5rem] cursor-pointer relative"
					onClick={() => {
						navigate('/cases')
					}}>
					<img src={active === 'case' ? '/icons/truck_icon_active.svg' : '/icons/truck_icon.svg'} className="h-[1rem] w-[1rem]" />
					<p className={active === 'case' ? 'text-text_color text-[1rem] leading[1.25rem]' : 'text-text_color_unactive text-[1rem] leading[1.25rem]'}>Case</p>
					<div className={active === 'case' ? 'border-t-2 shadow-[0px -3px 0px 0px ]  w-[100%] border-[#DF4949] absolute bottom-[-1.125rem] z-50 left-0 bottom-[-1.125rem]]' : ''}></div>
				</nav>
				<nav
					className="flex items-center cursor-pointer   gap-[0.5rem] relative"
					onClick={() => {
						navigate('/hypothesis')
					}}>
					<img src={active === 'hypotheses' ? '/icons/slider_active.svg' : '/icons/sliders_inactive.svg'} className="h-[1rem] text-text_color w-[1rem]" />
					<p className={active === 'hypotheses' ? 'text-text_color text-[1rem] leading[1.25rem]' : 'text-text_color_unactive text-[1rem] leading[1.25rem]'}>Hypotheses</p>
					<div className={active === 'hypotheses' ? 'border-t-2 shadow-[0px -3px 0px 0px ]  w-[100%] border-[#DF4949] absolute  left-0 bottom-[-1.125rem] bottom-[-1.125rem] z-50' : ''}></div>
				</nav>
				<nav
					className="flex items-center  cursor-pointer gap-[0.5rem] relative "
					onClick={() => {
						navigate('/singleproject')
					}}>
					<img src={active === 'experiments' ? '/icons/truck_icon_active.svg' : '/icons/truck_icon.svg'} className="h-[1rem] w-[1rem]" />
					<p className={active === 'experiments' ? 'text-text_color text-[1rem] leading[1.25rem]' : 'text-text_color_unactive text-[1rem] leading[1.25rem]'}>Experiments</p>
					<div className={active === 'experiments' ? 'border-t-2 shadow-[0px -3px 0px 0px ]  w-[100%] border-[#DF4949] absolute  left-0 bottom-[-1.125rem] z-50' : ''}></div>
				</nav>
				<nav
					className="flex items-center  cursor-pointer gap-[0.5rem] relative"
					onClick={() => {
						navigate('/draganddrop')
					}}>
					<img src={active === 'learnings' ? '/icons/users_active.svg' : '/icons/users_inactive.svg'} className="h-[1rem] w-[1rem]" />
					<p className={active === 'learnings' ? 'text-text_color text-[1rem] leading[1.25rem]' : 'text-text_color_unactive text-[1rem] leading[1.25rem]'}>Learnings</p>
					<div className={active === 'learnings' ? 'border-t-2 shadow-[0px -3px 0px 0px ] w-[100%] border-[#DF4949] absolute bottom-[-18px] left-0 z-50' : ''}></div>
				</nav>
			</section>
			<div className="border-t-2 shadow-[0px -3px 0px 0px ] border-[#CFD4DA]   "></div>
		</>
	)
}
