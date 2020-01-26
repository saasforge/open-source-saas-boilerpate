import React, { Component } from 'react';
import { commonFunctions } from '@src/components/commonFunctions';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.id = commonFunctions.generateShortId();
    }
    render() {
        if (this.props.icon){
            return(
                <div class="modal fade" id={} tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">{this.props.title || ''}</h5>
                                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {this.props.body || ''}
                            </div>
                            <div class="modal-footer container">
                                {this.props.footer ||
                                    <div class="row">
                                        <div class="modal-footer-info col-6">
                                        </div>
                                        <div class="modal-footer-buttons-block col-6 text-right">
                                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                            <button class="btn btn-primary">
                                                Ok
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Modal;