import {Home} from 'views/metrix/home'
import {AllProjects} from 'views/metrix/allprojects'
import {SingleProject} from 'views/metrix/singleproject'
import {Cases} from 'views/metrix/cases'
import {Hypothesis} from 'views/metrix/hypothesis'
import {UpdateHypothesis} from 'views/metrix/updatehypothesis'
import {UpdateExperiment} from 'views/metrix/updateexperiment'
import {Insight} from 'views/metrix/insight'
import {DragAndDrop} from 'views/metrix/dragdrop'

const Routes = [
	{
		path: '/',
		view: Home,
		layout: 'metrix',
		permission: 'user' || 'admin',
	},
	{
		path: '/allprojects',
		view: AllProjects,
		layout: 'metrix',
		permission: 'user' || 'admin',
	},
	{
		path: '/singleproject',
		view: SingleProject,
		layout: 'metrix',
		permission: 'user' || 'admin',
	},
	{
		path: '/cases',
		view: Cases,
		layout: 'metrix',
		permission: 'user' || 'admin',
	},
	{
		path: '/hypothesis',
		view: Hypothesis,
		layout: 'metrix',
		permission: 'user' || 'admin',
	},
	{
		path: '/updatehypothesis',
		view: UpdateHypothesis,
		layout: 'metrix',
		permission: 'user' || 'admin',
	},
	{
		path: '/experiment',
		view: UpdateExperiment,
		layout: 'metrix',
		permission: 'user' || 'admin',
	},
	{
		path: '/insight',
		view: Insight,
		layout: 'metrix',
		permission: 'user' || 'admin',
	},
	{
		path: '/draganddrop',
		view: DragAndDrop,
		layout: 'metrix',
		permission: 'user' || 'admin',
	}
]

export default Routes
