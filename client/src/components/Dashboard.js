import React,{Component} from 'react';
import Eventboard from './Eventboard';
import Popup from './popup/Popup';
import Itemboard from './itemboard/Itemboard';
import PictureEditor from './PictureEditor';
import ItemSelector from './ItemSelector';
import EventSelector from './EventSelector';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ls from 'local-storage';
import "../assets/styles/Dashboard.css";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPopup: true
        };
    }

    componentDidMount(){
        
        if(ls.get('username') === null || ls.get('username') === undefined){
            this.props.history.push('/');
        }
    }

    render() {
        
        return (
            <div className='dashboard'>
                <Itemboard />
                <Eventboard />
                {this.props.popup.show ? 
                    <Popup payload={this.props.popup.payload}/>
                    : null
                }
                {this.props.pictureEditor.show ? 
                    <PictureEditor payload={this.props.pictureEditor.payload}/>
                    : null
                }
                {this.props.itemSelector.show ? 
                    <ItemSelector payload={this.props.itemSelector.payload}/>
                    : null
                }
                {this.props.eventSelector.show ? 
                    <EventSelector payload={this.props.eventSelector.payload}/>
                    : null
                }

            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        popup: state.popup,
        pictureEditor: state.pictureEditor,
        itemSelector:state.itemSelector,
        eventSelector:state.eventSelector
    }
}

export default connect(mapStateToProps,actions)(Dashboard);