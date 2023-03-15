const ButtonStyle = {
	base: 'cursor-pointer font-sans',
	btn: 'block text-center px-12 ease-in-out duration-500 px-7 py-2 ',
	medium: 'text-[0.875rem] leading-[1.063rem] font-medium px-7 py-2',
	big: 'md:text-lg  py-3',
	small: 'text-[0.938rem] leading-[1.125rem] font-normal px-7 py-2',
	xsmall: 'text-[0.5rem] leading-[0.625rem] font-normal px-7 py-2',
	outline: 'text-slate-500 border-solid border border-slate-200 hover:text-white hover:border-slate-500 hover:bg-slate-500 bg-transparent',
	green: 'bg-emerald-500 hover:bg-emerald-600',
	red: 'bg-red-500 hover:bg-red-600 hover:border-red-500',
	blue: 'bg-blue-500 hover:bg-blue-600 hover:border-blue-600',
	light_blue: 'bg-light_blue',
	gray: 'bg-gray',
	orange: 'bg-orange-500 hover:bg-orange-600 hover:border-orange-600',
	textOnly: 'text-slate-500',
	iconButton: 'inline-block p-0 w-4 h-4',
	iconText: 'pl-11',
	iconTextOnly: 'pl-6',
	fullWidth: '!w-full',
	rounded: 'rounded-md',
	relative: 'relative',
	absolute: 'absolute',
	alignLeft: 'pl-6 pr-0',
	alignRight: 'pl-0 pr-6',
	loading: `relative after:absolute after:w-4 after:h-4 after:right-1 after:top-4 after:z-10
    after:bg-[url('components/button/icons/ico-loader.svg')] after:bg-contain after:right-3 after:origin-center after:animate-loading`
}

export default ButtonStyle
