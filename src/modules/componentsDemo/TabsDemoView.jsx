import React, { Component, lazy } from 'react';

import Alert from '@src/components/alert/Alert';
import TabsControl from '@src/components/tabsControl/TabsControl';
import './tabsDemoStyle.scss';

class TabsDemoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabsData: [{
                title: 'First tab',
                id: 'firstTab',
                content: (<div>
                    <Alert status="error" message="This tab was loaded from tab data item's content." />
                </div>),
                icon: 'charging-station',
                iconColor: 'blue'
            }, {
                title: 'Second tab - active by default, no icon',
                id: 'secondTab',
                active: true,
                component: lazy(() => import('@src/modules/componentsDemo/DemoLazyComponent')),
                data: {
                    text: 'This data was passed from the TabsControl data object'
                }
            }, {
                title: 'Third tab',
                id: 'thirdTab',
                icon: 'biohazard',
                iconClassName: 'icon-big-red'
            }]
        };
    }
    render() {
        return (
            <div className="panel-light">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Tabs control</h3>
                        <TabsControl data={this.state.tabsData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TabsDemoView;