const {compose} = wp.compose;
const {withSelect} = wp.data;
import {useEffect, useState} from '@wordpress/element';
import PreviewImportButton from '../preview-import-button';
import DependentPlugins from '../dependent-plugins';
import './style.scss'

function ButtonGroup (props) {
    const {importingTemplate, showDependencyBlock, index, data, pageData} = props;
    const [rootClassName, setRootClassName] = useState('starterblocks-import-button-group');

    // When some action is in progress, disable the button groups
    useEffect(() => {
        if (importingTemplate === null && rootClassName !== 'starterblocks-import-button-group')
            setRootClassName('starterblocks-import-button-group')
        if (importingTemplate !== null && rootClassName === 'starterblocks-import-button-group')
            setRootClassName('starterblocks-import-button-group disabled');
    }, [importingTemplate])
    return (
        <div className={rootClassName}>
            <PreviewImportButton index={index} data={data} pageData={pageData} />
            <DependentPlugins showDependencyBlock={showDependencyBlock} data={data} />
        </div>
    )
}



export default compose([
    withSelect((select) => {
        const {getImportingTemplate} = select('starterblocks/sectionslist');
        return {importingTemplate: getImportingTemplate()};
    })
])(ButtonGroup);
