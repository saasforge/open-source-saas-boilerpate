import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './inbox.scss';

class InboxUI extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: [
                {from: 'Startup School', star: false, tag: false, subj: 'Announcing Startup School Winter 2020 - Registration is Now Open!', time: '12:02 PM'},
                {from: 'Jamie Coolts', star: false, tag: true, subj: 'What about the parents party? Have a question', time: '11:13 AM'},
                {from: 'Amazon', star: true, tag: false, subj: 'Your order is shipped!', time: '10:22 AM'},
                {from: 'Marketing School', star: false, tag: true, subj: 'Please fill up the form - urgent', time: '09:45 AM'},
                {from: 'Bell Torsen', star: false, tag: false, subj: 'Request on the announcement', time: '07:21 AM', read: true},
                {from: 'RBC Bank', star: false, tag: false, subj: 'Please review the updated terms and conditions', time: '12:02 PM'},
                {from: 'Big March', star: false, tag: false, subj: 'Your article has been approved!', time: 'Dec 10'},
                {from: 'Noha', star: false, tag: false, subj: 'I cannot finish the assignment and I need your help', time: 'Dec 10'},
                {from: 'ServiceNumberOne', star: false, tag: true, subj: 'Please confirm your registration', time: 'Dec 10', read: true},
                {from: 'Blender Community', star: true, tag: false, subj: 'New message from Alex Xrambey', time: 'Dec 10', read: true},
                {from: 'UltraMarathon', star: true, tag: false, subj: 'Your new schedule arrived, please review', time: 'Dec 9'},
                {from: 'Google Analytics', star: false, tag: false, subj: 'Important message is waiting for you, confidential', time: 'Dec 9', read: true}
            ]
        };
    }
    render() {
        const messages = this.state.data.map((message, index)=>
            <tr key={message.subj}>
                <td className="text-center">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id={'checkbox_' + index} />
                        <label className="custom-control-label" htmlFor={'checkbox_' + index}></label>
                    </div>
                </td>
                <td>{message.from}</td>
                <td className="text-center">
                    {message.star ? <FontAwesomeIcon className="yellow" icon={['fas', 'star']} /> : <FontAwesomeIcon className="grey" icon={['far', 'star']} />}
                </td>
                <td className="text-center">{message.tag ? <FontAwesomeIcon className="tag-important" icon="tag" title="This message is important" /> : ''}</td>
                <td><span className={message.read ? 'font-weight-bold' : ''}>{message.subj}</span></td>
                <td>{message.time}</td>
            </tr>
        );
        return (
                <div className="panel-light inbox-panel">
                    <table className="w-100">
                        <tbody>
                            {messages}
                        </tbody>
                    </table>
                </div>
            );
    }
}

export default InboxUI;