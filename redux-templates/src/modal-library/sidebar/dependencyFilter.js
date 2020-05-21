const {Fragment} = wp.element;
const {compose} = wp.compose;
const {withDispatch, withSelect} = wp.data;
const {__} = wp.i18n;
import ChallengeDot from '~redux-templates/challenge/tooltip/ChallengeDot';

import {CheckboxControl, Tooltip} from '@wordpress/components';
import DependencyFilterRow from './dependencyFilterRow';
import {getDefaultDependencies, getInstalledDependencies} from '../../stores/helper';

function DependencyFilter(props) {
    const {dependencyFilters, loading, wholePlugins} = props;
    const {setDependencyFilters} = props;

    // Give the selected category(activeCategory) label className as "active"
    const isNoneChecked = () => {
        if (dependencyFilters.hasOwnProperty('none'))
            return dependencyFilters['none'].hasOwnProperty('value') ? dependencyFilters['none'].value : dependencyFilters['none'];
        return false;
    };

    const toggleNoneChecked = () => {
        setDependencyFilters({...dependencyFilters,
            none: { value: dependencyFilters['none'].value === false, disabled: dependencyFilters['none']['disabled'] === true }
        });
    };

    const setAllCheckedAs = (newVal) => {
        setDependencyFilters(
            Object.keys(dependencyFilters)
                .filter(key => key!=='none')
                .reduce((acc, key) => {
                    const disabled = dependencyFilters[key] ? dependencyFilters[key]['disabled'] : false;
                    return {...acc, [key]: {value: disabled ? false : newVal, disabled }}
                }, {none: {value: true, disabled: false}})
        );
    };

    return (
        <Fragment>
            {!loading && wholePlugins &&
                <div id="redux-templates-filter-dependencies" data-tut="tour__filter_dependencies">
                    <h3>{__('Required Plugins', redux-templates.i18n)}</h3>
                    <div className="redux-templates-select-actions">
                        <Tooltip text={__('Select All', redux-templates.i18n)}><a href="#" onClick={() => setAllCheckedAs(true)}>{__('All', redux-templates.i18n)}</a></Tooltip>
                        <span>&nbsp; / &nbsp;</span>
                        <Tooltip text={__('Native Blocks Only', redux-templates.i18n)}><a href="#" onClick={() => setAllCheckedAs(false)}>{__('None', redux-templates.i18n)}</a></Tooltip>
                        <span>&nbsp; / &nbsp;</span>
                        <Tooltip text={__('Installed Dependencies', redux-templates.i18n)}><a href="#" onClick={() => setDependencyFilters(getInstalledDependencies(dependencyFilters))}>
                            {__('Installed', redux-templates.i18n)}</a></Tooltip>
                        <span>&nbsp; / &nbsp;</span>
                        <Tooltip text={__('Reset Dependencies', redux-templates.i18n)}>
                            <a href="#" onClick={() => setDependencyFilters(getDefaultDependencies(dependencyFilters))}>
                            <i className="fas fa-undo" /></a></Tooltip>
                        <ChallengeDot step={2} />

                    </div>
                    <ul className="redux-templates-sidebar-dependencies">
                        { (loading === false) &&
                            <li>
                                {/*<Tooltip*/}
                                {/*    position='right'*/}
                                {/*    text="These templates only use native WordPress Gutenberg Blocks"*/}
                                {/*>*/}
                                <CheckboxControl
                                    label={__('Native', redux-templates.i18n)}
                                    checked={isNoneChecked()}
                                    onChange={toggleNoneChecked}
                                />
                                <Tooltip text={__('Only default WordPress blocks used.', redux-templates.i18n)} position='right'>
                                    <span style={{float:'right', marginRight:'2px'}}><i className="fa fa-info-circle" /></span>
                                </Tooltip>
                                {/*</Tooltip>*/}
                            </li>
                        }
                        {
                            Object.keys(dependencyFilters)
                                .filter(pluginKey => wholePlugins.indexOf(pluginKey)!==-1)
                                .sort()
                                .map(pluginKey =>
                                    <DependencyFilterRow key={pluginKey} pluginKey={pluginKey} />
                                )
                        }
                    </ul>
                </div>
            }
        </Fragment>
    );
}

export default compose([
    withDispatch((dispatch) => {
        const {setDependencyFilters} = dispatch('redux-templates/sectionslist');
        return {
            setDependencyFilters
        };
    }),

    withSelect((select) => {
        const {getDependencyFiltersStatistics, getLoading, getWholePlugins} = select('redux-templates/sectionslist');
        return {
            loading: getLoading(),
            dependencyFilters: getDependencyFiltersStatistics(),
            wholePlugins: getWholePlugins()
        };
    })
])(DependencyFilter);