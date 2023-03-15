/***
 *
 *   APP LAYOUT
 *   Main application layout containing the navigation
 *   and header (title, secondary nav and signed in user)
 *
 *   PROPS
 *   title: title of the view
 *
 **********/

import { Fragment, useContext } from 'react'
import { AuthContext, AppNav, Header, User } from 'components/lib'
import Style from './app.module.scss'

export function AppLayout(props) {
	// context & style
	const context = useContext(AuthContext)
	const user = JSON.parse(localStorage.getItem('user'))
	let routes = user?.permission == 'admin' ? [
		{ label: 'Hypothesis', icon: 'activity', link: '/updatehypothesis' },
		{ label: 'Experiment', icon: 'user', link: '/experiment' },
		{ label: 'Insight', icon: 'help-circle', link: '/insight' },
		{ label: 'Products', icon: 'user', link: '/allprojects' },
		{ label: 'Dashboard', icon: 'activity', link: '/dashboard' },
		{ label: 'Account', icon: 'user', link: '/account' },
		{ label: 'Help', icon: 'help-circle', link: '/help' },
		{ label: 'Sign Out', icon: 'log-out', action: context.signout }
	] : [
		{ label: 'Hypothesis', icon: 'activity', link: '/updatehypothesis' },
		{ label: 'Experiment', icon: 'user', link: '/experiment' },
		{ label: 'Insight', icon: 'help-circle', link: '/insight' },
		{ label: 'Products', icon: 'user', link: '/allprojects' },
		{ label: 'Account', icon: 'user', link: '/account' },
		{ label: 'Help', icon: 'help-circle', link: '/help' },
		{ label: 'Sign Out', icon: 'log-out', action: context.signout }
	]
	return (
		<Fragment>
			<AppNav
				items={routes}
			/>

			<main className={Style.app}>
				<Header title={props.title}>
					<User />
				</Header>

				{<props.children {...props.data} />}
			</main>
		</Fragment>
	)
}
