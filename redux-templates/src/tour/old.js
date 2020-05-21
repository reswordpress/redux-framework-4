/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n'
import {Tooltip} from '@wordpress/components';
import './style.scss'

const {compose} = wp.compose;
const {withDispatch, withSelect, select, subscribe} = wp.data;
const {useState, useEffect} = wp.element;
/**
 * External dependencies
 */

import {ModalManager} from '../modal-manager'
import PreviewModal from '../modal-preview';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import Tour from './Tour';
import {animateScroll} from 'react-scroll';

function ReduxTemplatesTour(props) {
    const {autoTourStart} = props;
    const {setTourActiveButtonGroup, setTourPreviewVisible, setTourOpen, setImportingTemplate} = props;
    const {isTourOpen, getPageData} = props;
    const [needUpdate, setNeedUpdate] = useState('');

    useEffect(() => {
        if (autoTourStart === true) {
            setTourOpen(true);
            delete redux-templates.tour;
        }
    }, [autoTourStart]);

    const tourConfig = [
        {
            selector: '.redux-templates-pagelist-modal-inner',
            content: __('Welcome to the ReduxTemplates! Let\'s go over how to use our library.', redux-templates.i18n),
            position: 'center',
            stepInteraction: false,
        },
        {
            selector: '[data-tut="tour__navigation"]',
            content: ({goTo}) => (
                <div>
                    These are the different types of templates we have.
                    <ul>
                        <li>
                            <strong>Sections</strong> are the building blocks of a page. Each "row" of content on a page we consider a section.
                        </li>
                        <li><strong>Pages</strong> are, you guessed it, a group of multiple sections making up a page.
                        </li>
                        <li><strong>Collections</strong> are groups of pages that all follow a style or theme.
                        </li>
                        <li><strong>Saved</strong> are reusable blocks that you may have previously saved for later.
                        </li>
                    </ul>
                </div>
            ),
            position: 'center'
        },
        {
            selector: '[data-tut="tour__filtering"]',
            content: __('This area is where you can search and filter to find the right kind of templates you want.', redux-templates.i18n),
            position: 'right',
            action: () => {
                animateScroll.scrollToTop({
                    containerId: 'redux-templates-collection-modal-sidebar',
                    duration: 0,
                });
            },
        },
        {
            selector: '[data-tut="tour__filtering"]',

            content: () => (
                <div>
                    Some templates require certain plugins. You can filter or select those templates. Hint, if the text
                    is a <a href="#" className="missing-dependency">little orange</a>, you don't have that plugin
                    installed yet, but don't worry. ReduxTemplates will help you with that too.
                </div>
            ),
            action: () => {
                animateScroll.scrollToBottom({
                    containerId: 'redux-templates-collection-modal-sidebar',
                    duration: 300,
                });
            },

            position: 'right'
        },
        {
            selector: '[data-tut="tour__main_body"]',
            content: __('This area is where the templates will show up that match the filters you\'ve selected. You can click on many of them to preview or import them.', redux-templates.i18n),
            position: 'center',
            action: () => {
                animateScroll.scrollToTop({
                    containerId: 'redux-templates-collection-modal-sidebar',
                    duration: 0,
                });
                setTourActiveButtonGroup(null);
            }
        },
        {
            selector: '#modalContainer .redux-templates-single-item-inner:first-child',
            content: __('When you hover over a template you can see via icons what plugins are required for this template. You can then choose to Preview or Import a design.', redux-templates.i18n),
            action: () => {
                ModalManager.closeCustomizer();
                const pageData = getPageData();
                if (pageData && pageData.length > 0) {
                    setTourActiveButtonGroup(pageData[0])
                }
            },
            position: 'bottom'
        },
        {
            selector: '.wp-full-overlay-sidebar',
            // selector: '[data-tut="tour__preview_sidebar"]',
            content: __('This is the preview dialog. It gives more details about the template and helps you to see what you could expect the templates to look like.', redux-templates.i18n),
            action: () => {
                setTourActiveButtonGroup(null);
                setImportingTemplate(null);
                const pageData = getPageData();
                if (pageData && pageData.length > 0) {
                    ModalManager.openCustomizer(
                        <PreviewModal startIndex={0} currentPageData={pageData}/>
                    )
                }
            },
            position: 'center'
        },
        {
            selector: '.redux-templates-import-wizard-wrapper',
            content: __('When you click to import a template, sometimes you will be missing one of the required plugins. ReduxTemplates will do its best to help you install what\'s missing. If some of them are premium plugins, you will be provided details on where you can get them.', redux-templates.i18n),
            position: 'top',
            action: () => {
                // if (ModalManager.isModalOpened() === false) ModalManager.open(<LibraryModal autoTourStart={false} />)
                ModalManager.show();
                ModalManager.closeCustomizer();
                const pageData = getPageData();
                if (pageData && pageData.length > 0) setImportingTemplate(pageData[0])
                setNeedUpdate(new Date().toString());
            }
        },
        {
            selector: '.components-base-control.editor-page-attributes__template',
            content: __('Sometimes your theme may conflict with a template. If you\'re on a page, you can set a page template and override your theme in different ways, including just passing it all together.', redux-templates.i18n),
            action: () => {
                setImportingTemplate(null);
                ModalManager.hide();
            },
            position: 'center'
        },
        {
            selector: '.redux-templates-pagelist-modal-inner',
            content: __('Well, that is the tour. Take a look around. We hope you love ReduxTemplates!', redux-templates.i18n),
            action: () => {
                ModalManager.show();
                setNeedUpdate(new Date().toString());
            },
            position: 'center'
        },
    ];


    const accentColor = '#5cb7b7';
    const disableBody = target => disableBodyScroll(target);
    const enableBody = target => enableBodyScroll(target);

    const onRequestClose = () => {
        ModalManager.closeCustomizer();
        setTourOpen(false);
        setTourActiveButtonGroup(null);
        setImportingTemplate(null);
    }

    return <Tour
        onRequestClose={onRequestClose}
        steps={tourConfig}
        isOpen={false && isTourOpen}
        onBeforeClose={() => ModalManager.show()}
        update={needUpdate}
        lastStepNextButton={<span className="button button-small">{__('Finish', redux-templates.i18n)}</span>}
        rounded={0}
        accentColor={accentColor}
        disableInteraction={true}
    />
}


export default compose([
    withDispatch((dispatch) => {
        const {setTourActiveButtonGroup, setTourPreviewVisible, setTourOpen, setImportingTemplate} = dispatch('redux-templates/sectionslist');
        return {
            setTourActiveButtonGroup,
            setTourPreviewVisible,
            setTourOpen,
            setImportingTemplate
        };
    }),

    withSelect((select, props) => {
        const {getTourOpen, getPageData} = select('redux-templates/sectionslist');
        return {
            isTourOpen: getTourOpen(),
            getPageData
        };
    })
])(ReduxTemplatesTour);