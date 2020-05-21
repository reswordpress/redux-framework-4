import {Fab, Action} from 'react-tiny-fab';
import config from './config';
import './styles.scss';
import {__} from '@wordpress/i18n';



import * as Icons from '~redux-templates/icons'

export default function FabWrapper() {
    const {mainButtonStyles, actionButtonStyles, position, event, alwaysShowTitle} = config;

    return (
        <Fab
            mainButtonStyles={mainButtonStyles}
            position={position}
            icon={Icons.ReduxTemplatesIcon()}
            event={event}
            // onClick={testing}

            text={__('See Quick Links', redux-templates.i18n)}
        >

            {/*<Action*/}
            {/*    style={actionButtonStyles}*/}
            {/*    text={__('Suggest a Feature', redux-templates.i18n)}*/}
            {/*    onClick={e => {*/}
            {/*        window.open(redux-templates.u, "_blank")*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <i className="fa fa-lightbulb-o"/>*/}
            {/*</Action>*/}
            <Action
                style={actionButtonStyles}
                text={__('Join Our Community', redux-templates.i18n)}
                onClick={e => {
                    window.open('https://www.facebook.com/groups/reduxframework', '_blank')
                }}
            >
                <i className="fa fa-comments"/>
            </Action>
            {/*<Action*/}
            {/*    style={actionButtonStyles}*/}
            {/*    text={__('Take Our Tour', redux-templates.i18n)}*/}
            {/*    onClick={e => {*/}
            {/*        setTourOpen();*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <i className="fas fa-map-signs"/>*/}
            {/*</Action>*/}
            {/*<Action*/}
            {/*    style={actionButtonStyles}*/}
            {/*    text={__('Support & Docs', redux-templates.i18n)}*/}
            {/*    onClick={e => {*/}
            {/*        window.open('https://docs.redux.io/', "_blank")*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <i className="fa fa-life-ring"/>*/}
            {/*</Action>*/}
            {
                redux-templates.mokama !== 1 &&
                <Action
                    style={actionButtonStyles}
                    text={__('Upgrade to Redux Pro', redux-templates.i18n)}
                    onClick={e => {
                        window.open(redux-templates.u, '_blank')
                    }}
                >
                    <i className="fa fa-star"/>
                </Action>
            }
        </Fab>
    );
}