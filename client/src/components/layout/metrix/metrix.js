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

import {Fragment, useContext} from 'react'
import {AppNav, Header} from 'components/lib'
import Style from './metrix.module.scss'

export function MetrixLayout(props) {
	// context & style
	const user = JSON.parse(localStorage.getItem('user'))
	return (
		<Fragment>
			<AppNav
				items={[
					{label: 'Hypothesis', icon: 'activity', link: '/updatehypothesis'},
					{label: 'Experiment', icon: 'user', link: '/experiment'},
					{label: 'Insight', icon: 'help-circle', link: '/insight'},
					{label: 'Products', icon: 'user', link: '/allprojects'},
					user?.permission == 'admin' &&{label: 'Dashboard', icon: 'user', link: '/account'}
				]}
			/>
			<main className={Style.app}>
				<Header title={props.title}></Header>
				{<props.children {...props.data} />}
			</main>
		</Fragment>
	)
}
