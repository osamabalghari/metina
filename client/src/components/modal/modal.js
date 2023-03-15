/***
 *
 *   MODAL
 *   Display an overlay modal anywhere in your application by calling
 *   context.modal.show() with an object containing the following props
 *
 *   PROPS
 *   title: (optional)
 *   text: message to the user (optional)
 *   form: a form object (optional: see form docs for more information)
 *   url: destination to send the form
 *   method: HTTP post type
 *   buttonText – text for the confirm button
 *
 **********/

import { useContext } from 'react'
import { ViewContext, Card, Form, Button } from 'components/lib'
import { CSSTransition } from 'react-transition-group'
import './modal.scss'
import Style from 'components/form/form.tailwind'

export function Modal(props) {
	const context = useContext(ViewContext)

	return (
		<CSSTransition in appear timeout={0} classNames="modal">
			<div className="modal" onClick={(e) => e.target === e.currentTarget && context.modal.hide(true)}>
				<div className="modal-content overflow-auto">
					<Card title={props.title} height={props.delete && 'h-60'}>
						{props.text && <p>{props.text}</p>}
						{props.body && <div className='text-[0.938rem]'>{props.body}</div>}
						{props.form && <Form method={props.method} url={props.url} inputs={props.form} destructive={props.destructive} id={props?.team_id} buttonText={props.buttonText} cancel={(e) => context.modal.hide(true)} images={props.images} />}

						{props.delete &&<div className='absolute bottom-2' style={{width:'90%'}}>
							{props.buttonText && <Button color={props.destructive ? 'red' : 'green'} loading={props.loading} text={props.buttonText} action={props.submit} className={Style.button} fullWidth={!props.cancel} />}
							{props.cancel && <Button color={props.destructive ? 'green' : 'red'} outline text="Cancel" className={Style.button} action={()=>context.modal.hide(true)} />}
						</div>}
					</Card>
				</div>
			</div>
		</CSSTransition>
	)
}
