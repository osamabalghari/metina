import { useContext } from 'react'
import { ViewContext, Card, Button } from 'components/lib'
import { CSSTransition } from 'react-transition-group'
import './modal.scss'
import Style from '../form/form.tailwind'

export function ConfirmationModal(props) {
    const context = useContext(ViewContext)

    return (
        <CSSTransition in appear timeout={0} classNames="modal">
            <div className="modal" onClick={(e) => e.target === e.currentTarget && context.modal.hide(true)}>
                <div className="modal-content overflow-auto">
                    <Card title={props.title}>
                        {props.text && <p>{props.text}</p>}

                        {props.body && <div>{props.body}</div>}
                        {props.buttonText && <Button color={props.destructive ? 'red' : 'green'} loading={props.loading} text={props.buttonText} action={props.submit} className={Style.button} fullWidth={!props.cancel} />}
                        {props.cancel && <Button color={props.destructive ? 'green' : 'red'} outline text="Cancel" className={Style.button} action={props.cancel} />}
                    </Card>
                </div>
            </div>
        </CSSTransition>
    )
}