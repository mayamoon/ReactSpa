// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var $ = require("jquery") as any;
import * as React from 'react'
import * as ReactDOM from 'react-dom'
var shallowCompare = require('react/lib/shallowCompare') as any;

function wrapWidget(name:string) {
    var displayName = 'React' + name[0].toUpperCase() + name.slice(1);

    return React.createClass({
        render: function () {
            return this.props.children;
        },

        componentDidUpdate: function (prevProps) {
            if (!shallowCompare(prevProps, this.props)) {
                this._runPlugin();
            }
        },

        componentDidMount: function () {
            this._runPlugin();
        },

        _runPlugin: function () {
            var $node = $(ReactDOM.findDOMNode(this));
            $node[name](this.props);
            this.$ = $node;
        },

        displayName: displayName
    });
}

var WIDGETS = {
    Accordion: 'accordion',
    Autocomplete: 'autocomplete',
    Button: 'button',
    DatePicker: 'datepicker',
    Draggable: 'draggable',
    Droppable: 'droppable',
    Menu: 'menu',
    ProgressBar: 'progressbar',
    Resizable: 'resizable',
    Selectable: 'selectable',
    Sortable: 'sortable',
    Slider: 'slider',
    Spinner: 'spinner',
    Tabs: 'tabs',
    Tooltip: 'tooltip',
    Dialog:"dialog"
};

var ReactJQueryUI: { [name: string]: React.ClassicComponentClass<any> } = {};

for (var key in WIDGETS) {
    ReactJQueryUI[key] = wrapWidget(WIDGETS[key]);
}

export default ReactJQueryUI;

